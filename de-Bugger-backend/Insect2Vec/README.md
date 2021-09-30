# Insect2Vec

## Background
Bio-vector is inspired by word2vec, which is a well-known model for natural language processing (NLP). In word2vec, assuming that two consecutive words in a sentence should be more related than others, the relationship between words can be modeled by estimating their distance. Based on this, by defining a latent space with pre-defined dimensionality, one can cast each word to a position in the latent space; thus, a word can be represented by a vector, also called embedding. The relationship between two words can be directly and approximately quantified by calculating the distance between their corresponding embeddings. Since word2vec extract the relationship between words with no need for data labeling, the derived models in many domains not limited to NLP have sprung out recently.
 
In this field, our goal is to cast each insect species to a latent space to generate embedding for each of them. We assume that insect co-occurrence can be regarded as a close relationship, and thus the embeddings/vectors of two insects that occur at the same space and time should be as close as possible. By contrast, two insect species not occurring at the same place could be regarded as a long-distance between their embeddings in the latent space. The insect2vec (bio-vector) can be applied in many analytical tasks. For example, one can easily estimate the habitat distribution of an insect by using the bio-vector integrated with geo-spatial data. Based on this model, one can also predict which insect species could be harsh to the environment in a place and accordingly take actions to avoid predictable ecological disasters.


![](https://i.imgur.com/sDHOl8f.png)

## Usage

1. Run `DumpObsrv.py` to dump all the observations of species in Taiwan.
2. Run `ConvertObsrv2Matrix.py` to convert the observations into `(row, col, val)` triplet format for sparse matrix.
3. Run `TrainModel.py` to train the bio-vector.

