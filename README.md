# de Bugger

Come and discover Taiwan’s insects


## Related Developer

- [Bonzo](https://github.com/bonzoyang)

For `de-Bugger-backend/backend`

- [s83711123456789](https://github.com/s83711123456789)

For `de-Bugger-backend/DeBuggerNet`

- [iankuoli](https://github.com/iankuoli)

For `de-Bugger-backend/Insect2Vec`

# What is de Bugger?

DeBugger is a geographic bioinfo emulator empowered by a CNN engine to integrate the rich information including precipitation, vegetation, temperature, etc. provided by NASA Earthdata Search. Based on our novel bio-vectors and environmental conditions, DeBugger can predict the future distribution of different types of insects.

Furthermore, we believe that the prediction of different species can rely on different environmental information. To address this problem, an attention module is integrated into the CNN which selects important features automatically during training.

In this way, the attention module masks out all unrelated information and leaves the import feature for further usage.

## How to use it?

The proposed model, insect2vec, calculates an embedding for each insect by considering the co-occurrence between insects in a real-world environment. The insect2vec (bio-vector) can be applied in many analytical tasks.

For example, one can easily estimate the habitat distribution of an insect by using the bio-vector integrated with geo-spatial data. Based on this model, one can also predict which insect species could be harsh to the environment in a place and accordingly take actions to avoid predictable ecological disasters.

## DeBugger Squad

![image](https://user-images.githubusercontent.com/20000669/135740648-c41ec050-90eb-4877-bf4a-72dc4f8bad7a.png)

## Preview

### Home

![image](https://user-images.githubusercontent.com/20000669/135740660-1e16d6b7-d90d-445b-b47e-cfae4644902c.png)

![image](https://user-images.githubusercontent.com/20000669/135740668-67b958f0-f5d4-4152-b449-67322718fe19.png)

### Discover

![image](https://user-images.githubusercontent.com/20000669/135740678-af72d28b-e834-4bd4-ad43-e9e52666f181.png)

![image](https://user-images.githubusercontent.com/20000669/135740691-4e957bf0-b7d8-47cb-a06b-05e3b6331f15.png)

![image](https://user-images.githubusercontent.com/20000669/135740704-a86c0247-fa2f-47ec-82a8-65196bcbf0b8.png)


### About 

![image](https://user-images.githubusercontent.com/20000669/135740710-d4949b1e-0186-4313-83ad-6a9b8ef423e9.png)


## Setup development environment

```bash
git clone git@github.com:TsungTang/debugger.git

cd debugger

npm install
npm run dev
```

with docker

```
docker build -t de-bugger . --no-cache
docker run --rm -it -p 3000:3000 -v $(pwd):/frontend  de-bugger
```

Now you can view development website in http://localhost:3000/

## Website

Deploy it to the cloud with [Vercel](https://debugger.vercel.app/)

We also provide an alternative site on Mircosoft Azure, please check  http://20.89.129.235:3000
![](https://i.imgur.com/atIFsBk.png)
