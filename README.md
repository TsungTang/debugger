# de Bugger

Come and discover Taiwan’s insects
# What is de Bugger?

DeBugger is a geographic bioinfo emulator empowered by a CNN engine to integrate the rich information including precipitation, vegetation, temperature, etc. provided by NASA Earthdata Search. Based on our novel bio-vectors and environmental conditions, DeBugger can predict the future distribution of different types of insects.

Furthermore, we believe that the prediction of different species can rely on different environmental information. To address this problem, an attention module is integrated into the CNN which selects important features automatically during training.

In this way, the attention module masks out all unrelated information and leaves the import feature for further usage.

## How to use it?

The proposed model, insect2vec, calculates an embedding for each insect by considering the co-occurrence between insects in a real-world environment. The insect2vec (bio-vector) can be applied in many analytical tasks.

For example, one can easily estimate the habitat distribution of an insect by using the bio-vector integrated with geo-spatial data. Based on this model, one can also predict which insect species could be harsh to the environment in a place and accordingly take actions to avoid predictable ecological disasters.

## DeBugger Squad

https://hackmd.io/_uploads/ByI6L28VK.png

## Preview

### Home

https://hackmd.io/_uploads/BkClDnU4F.png

https://hackmd.io/_uploads/ByO7v38VK.png

### Discover

https://hackmd.io/_uploads/rJpBDn8EF.png

https://hackmd.io/_uploads/HJNOD3I4Y.png

https://hackmd.io/_uploads/H1fcPhI4Y.png


### About 

https://hackmd.io/_uploads/Hkn6D2L4K.png


## Setup development environment

```bash
git clone git@github.com:TsungTang/debugger.git

cd debugger

npm install
npm run dev
```

## Website

Deploy it to the cloud with [Vercel](https://debugger.vercel.app/)

- https://debugger.vercel.app/

