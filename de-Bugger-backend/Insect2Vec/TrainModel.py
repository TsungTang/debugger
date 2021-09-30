import numpy as np
import random
import torch
from torch import nn
from torch.utils.data import Dataset, DataLoader
from torchvision import datasets
from torchvision.transforms import ToTensor
# import matplotlib.pyplot as plt
from tqdm import tqdm

torch.cuda.set_device(0)


class RatingDataset(Dataset):
    def __init__(self, train, label):
        self.feature_ = train
        self.label_ = label

    def __len__(self):
        # Return size of dataset
        return len(self.feature_)

    def __getitem__(self, idx):
        return torch.tensor(self.feature_[idx], dtype=torch.long), torch.tensor(self.label_[idx])


class MatrixFactorization(torch.nn.Module):

    def __init__(self, n_bio, n_factors=20):
        super().__init__()
        self.bio_factors = torch.nn.Embedding(n_bio, n_factors)
        # self.item_factors = torch.nn.Embedding(n_items, n_factors)
        torch.nn.init.xavier_uniform_(self.bio_factors.weight)
        # torch.nn.init.xavier_uniform_(self.item_factors.weight)
        self.log_sigmoid = nn.LogSigmoid()

    def forward(self, pos_idxs, ys, neg_idxs, num_neg=10):
        #
        # Compute positive samples
        # ----------------------------------------------------------------
        # u,v: [batch_size, emb_dim]
        u = self.bio_factors(pos_idxs[0])
        v = self.bio_factors(pos_idxs[1])
        alpha = torch.log(torch.sqrt(ys) + 1.) + 1.
        positive_loss = -alpha * self.log_sigmoid(torch.sum(u * v, dim=1)).squeeze()

        #
        # Compute negative samples
        # ----------------------------------------------------------------
        nu = self.bio_factors(neg_idxs[0])
        nv = self.bio_factors(neg_idxs[1])
        negative_loss = -self.log_sigmoid(-torch.sum(nu * nv, dim=1)).squeeze()

        return (torch.sum(positive_loss) + torch.sum(negative_loss)) / (pos_idxs.shape[1] * (1 + num_neg))


"""
Parameters Settings
------------------------------------------------------------------------------------------------------------------------
embedding size = (14325, 128)
number of data = 39773008
dense of matrix = 19.38%
"""
batch_size = 10000
num_factor = 64
num_neg = 5
# Test for toy dataset
# batch_size = 10
# num_factor = 2
# num_neg = 5
"""
Data Loading
------------------------------------------------------------------------------------------------------------------------
"""
idx2species = dict()
species2idx = dict()
Xs = []
ys = []

# with open("species_matrix.csv", "r", encoding='utf-8') as f:    # for toy dataset
with open("toy_matrix.csv", "r", encoding='utf-8') as f:
    line = f.readline()
    while line:
        line = f.readline()
        lines = line.strip().split('\t')
        if len(lines) != 3:
            continue
        if lines[0] == lines[1]:
            continue
        if lines[0] not in species2idx:
            species2idx[lines[0]] = len(idx2species)
            idx2species[len(idx2species)] = lines[0]
        if lines[1] not in species2idx:
            species2idx[lines[1]] = len(idx2species)
            idx2species[len(idx2species)] = lines[1]
        Xs.append((species2idx[lines[0]], species2idx[lines[1]]))
        ys.append(float(lines[2]))
        Xs.append((species2idx[lines[1]], species2idx[lines[0]]))
        ys.append(float(lines[2]))


with open("idx2species.csv", "w", encoding='utf-8') as out_file:
    for key in sorted(idx2species.keys()):
        try:
            out_file.write("{}\t{}\n".format(key, idx2species[key]))
        except:
            print(key, idx2species[key])

print("embedding size = ({}, {})".format(len(idx2species), num_factor))
print("number of data = {}".format(len(Xs)))
print("batch_size = {}; num_neg = {}".format(batch_size, num_neg))


"""
Model Training
------------------------------------------------------------------------------------------------------------------------
"""
train_dataloader = DataLoader(RatingDataset(Xs, ys), batch_size=batch_size, shuffle=True)
model = MatrixFactorization(len(idx2species), n_factors=num_factor)

dev = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
model.to(dev)

optimizer = torch.optim.Adam(model.parameters(), lr=0.1, weight_decay=1e-6)  # learning rate

epochs = 2000
for epoch in range(0, epochs):
    pbar = tqdm(enumerate(train_dataloader), total=len(train_dataloader))  # progress bar
    count = 0
    cum_loss = 0.
    for i, (train_batch, label_batch) in pbar:
        count = 1 + i

        # Negative sampling for column
        neg_smpls = np.zeros(num_neg)
        for i in range(min(batch_size, train_batch.shape[0])):
            delta = random.sample(list(range(len(idx2species))), num_neg)
            neg_smpls = np.vstack([neg_smpls, delta])
        neg_cols = torch.tensor(neg_smpls[1:].reshape((-1,)), dtype=torch.long)
        neg_rows = train_batch[:, 0].repeat(num_neg)
        neg_idxs = torch.vstack([neg_rows, neg_cols])

        # Model Prediction and loss calculation
        loss = model(train_batch.T.to(dev), label_batch.to(dev), neg_idxs.to(dev))

        # Model updating
        optimizer.zero_grad()
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1)    # gradient clipping
        optimizer.step()

        cum_loss += loss.item()
        pbar.set_description('training loss at {} batch {}: {}'.format(epoch, i, loss.item()))

    train_loss = cum_loss / count
    print('avg training loss: ', train_loss)
    torch.save(model.state_dict(), 'model_step_%d.pt' % epoch)
