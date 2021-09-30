import os
import cv2
import json
import math
import tensorflow as tf
import numpy as np
from tensorflow.keras.utils import Sequence

class DataLoader(Sequence):
    
    """
    Dataloader
    """

    def __init__(self, args):
        """
        Initialization

        :data_folder: path to folder with images (all images: both train and valid)
        :target_samples: an array of basenames for images to use within generator (e.g.: only those for train)
        :preprocessing_f: input preprocessing function
        :input_height: (int) image height to be fed into the neural net
        :input_width: (int) image width to be fed into the neural net
        :batch_size: (int) batch size at each iteration
        :input_step_size: (int) how many quaters used as input
        :output_step_size: (int) how many quaters predicted
        :shuffle: True to shuffle indices after each epoch
        :aug: True to augment input images
        """

        self.data_folder = args['data_folder']
        self.input_height = args['input_height']
        self.input_width = args['input_width']
        self.batch_size = args['batch_size']
        self.input_step_size = args['input_step_size']
        self.output_step_size = args['output_step_size']
        self.shuffle = args['shuffle']
        self.aug = args['aug']
        self.train = args['train']
        
        
        with open(os.path.join(self.data_folder,args['samples_json']), 'r') as f:
            self.samples = json.load(f)
        with open(os.path.join(self.data_folder,args['env_json']), 'r') as f:
            self.env = json.load(f)
        with open(os.path.join(self.data_folder,args['bio_json']), 'r') as f:
            self.bio = json.load(f)
        self.on_epoch_end()


    def __len__(self):
        """
        Denotes the number of batches per epoch

        :return: nuber of batches per epoch
        """
        return math.ceil(len(self.samples) / self.batch_size)


    def __getitem__(self, index):
        """
        Generates a batch of data (X and Y)
        """

        indices = self.indices[index * self.batch_size : (index + 1) * self.batch_size]
        
        inputs = []
        labels = []
        vectors = []
        zeros = []
        input_imgs = []
        names = []
        for idx in indices:
            sample = self.samples[idx]

            inputs.append(self._get_input(sample))
            labels.append(self._get_label(sample))
            vectors.append(self._get_bio_vector(sample))
            zeros.append(np.zeros((1,1,self.image_input_channel)))
            input_imgs.append(self._get_input_img(sample))
            names.append((self._get_species_name(sample), sample['date']))
            
        image_inputs = np.stack(inputs, axis=0)
        vector_inputs = np.stack(vectors, axis=0)
        labels = np.stack(labels, axis=0)
        zeros = np.stack(zeros, axis=0)
        input_imgs = np.stack(input_imgs, axis=0)
        
        image_inputs = image_inputs.astype(float)
        vector_inputs = vector_inputs.astype(float)
        labels = labels.astype(float)
        zeros = zeros.astype(float)
        
        # normalization # dirty
        image_inputs -= 127.5
        image_inputs /= (255+1e-3)
        labels /= (255+1e-3)
        if self.train:
            return [image_inputs, vector_inputs], [labels, zeros]
        else:
            return [image_inputs, vector_inputs], [labels, zeros], input_imgs, names


    def on_epoch_end(self):
        """
        Updates indices after each epoch
        """

        self.indices = np.arange(len(self.samples))
        if self.shuffle:
            np.random.shuffle(self.indices) #inplace shuffling
            
    @property
    def image_input_channel(self):
        num_env = len(self.env)
        num_bio = 1
        return (num_env+num_bio)*self.input_step_size
    
    @property
    def vector_input_channel(self): # dirty
        k = list(self.bio.keys())[0]
        return len(self.bio[k]['vector'])
    
    @property
    def output_channel(self):
        return self.output_step_size
    
    def _get_input(self, sample):
        species = sample['species']
        date = sample['date']
        end_idx = self._date_to_quater_idx(date)
        start_idx = end_idx - self.input_step_size
        inputs = []
        for k in self.env:
            names = self.env[k]['file_list'][start_idx:end_idx]
            imgs = [cv2.imread(os.path.join(self.data_folder, name), 0) for name in names]
            inputs.append(np.stack(imgs, axis=2))
        
        names = self.bio[species]['file_list'][start_idx:end_idx]
        imgs = [cv2.imread(os.path.join(self.data_folder, name), 0) for name in names]
        imgs = [cv2.threshold(img, 1, 255, cv2.THRESH_BINARY)[1] for img in imgs] # del
        inputs.append(np.stack(imgs, axis=2))
        inputs = np.concatenate(inputs, axis=2)
        return inputs
    
    def _get_distribution(self, sample):
        species = sample['species']
        date = sample['date']
        end_idx = self._date_to_quater_idx(date)
        start_idx = end_idx - 1

        
        names = self.bio[species]['file_list'][start_idx:end_idx]
        imgs = [cv2.imread(os.path.join(self.data_folder, name), 0) for name in names]
        return imgs.extend_dims(imgs,axis=2)
        
    def _get_input_img(self, sample):
        species = sample['species']
        date = sample['date']
        end_idx = self._date_to_quater_idx(date)
        start_idx = end_idx - self.input_step_size
        
        names = self.bio[species]['file_list'][start_idx:end_idx]
        imgs = [cv2.imread(os.path.join(self.data_folder, name), 0) for name in names]
        imgs = [cv2.threshold(img, 1, 255, cv2.THRESH_BINARY)[1] for img in imgs] # del
        return np.stack(imgs, axis=2)
        
    def _get_label(self, sample):
        species = sample['species']
        date = sample['date']
        
        start_idx = self._date_to_quater_idx(date)
        end_idx = start_idx + self.output_step_size
        names = self.bio[species]['file_list'][start_idx:end_idx]
        imgs = [cv2.imread(os.path.join(self.data_folder, name), 0) for name in names]
        imgs = [cv2.threshold(img, 1, 255, cv2.THRESH_BINARY)[1] for img in imgs] # del
        labels = np.stack(imgs, axis=2)
        return labels
        
    def _get_bio_vector(self, sample):
        species = sample['species']
        vector = np.array(self.bio[species]['vector'])
        vector = vector.reshape(1,1,-1)
        return vector
    
    def _get_species_name(self, sample):
        species = sample['species']
        return species
    
    def _date_to_quater_idx(self, date):
        '''
        :date (str) '2000_Q_1'
        '''
        y, q = date.split('_Q_')
        y, q = int(y), int(q)
        return 4*(y-2000) + q - 1
