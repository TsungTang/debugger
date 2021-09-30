import numpy as np 
import os
import skimage.io as io
import skimage.transform as trans
import numpy as np
import tensorflow as tf
from tensorflow import keras
import tensorflow_addons as tfa
from keras.models import *
from keras.layers import *
from keras.optimizers import *
from keras.callbacks import ModelCheckpoint, LearningRateScheduler
from keras import backend as keras
from focal_loss import BinaryFocalLoss


def unet(image_input_size, vector_input_size, output_size, pretrained_weights = None, network_size=1):
    image_input = Input(image_input_size, name='image_input')
    vector_input = Input(vector_input_size, name='biovector_input')
    
    v_sep1 = Conv2D(735, 1, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='v_fc_1')(vector_input)
    
    v_conv2 = Reshape((35,21,1))(v_sep1)
    v_conv2 = Conv2D(4, 1, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='v_conv_2_1')(v_conv2)
    v_conv2 = Conv2D(8, 1, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='v_conv_2_2')(v_conv2)
    v_conv2 = Conv2D(16, 1, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='v_conv_2_3')(v_conv2)
    v_conv2 = Conv2D(32, 1, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='v_conv_2_4')(v_conv2)
    v_conv2 = Conv2D(64, 1, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='v_conv_2_5')(v_conv2)
    v_conv2 = Conv2D(128, 1, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='v_conv_2_6')(v_conv2)
    v_conv2 = Conv2D(256, 1, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='v_conv_2_7')(v_conv2)
    
    v_conv1 = Conv2D(128, 1, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='v_conv_1_1')(v_sep1)
    v_conv1 = Conv2D(64, 1, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='v_conv_1_2')(v_conv1)
    v_conv1 = Conv2D(32, 1, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='v_conv_1_3')(v_conv1)
    v_conv1 = Conv2D(16, 1, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='v_conv_1_4')(v_conv1)
    v_conv1 = Conv2D(8, 1, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='v_conv_1_5')(v_conv1)
    atten_1 = Conv2D(image_input_size[2], 1, activation = 'sigmoid', padding = 'same', kernel_initializer = 'he_normal', name='attention_output')(v_conv1)
#     atten_1 = tf.keras.backend.tile(atten_1, (1, image_input_size[0], image_input_size[1], 1))
#     print(atten_1.shape)
#     print(image_input.shape)
    atten_input = Multiply()([atten_1, image_input])
    
    conv1 = Conv2D(64, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_1_1')(atten_input)
    conv1 = tfa.layers.GroupNormalization(groups=4, axis=3)(conv1)
    conv1 = Conv2D(64, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_1_2')(conv1)
    pool1 = MaxPooling2D(pool_size=(2, 2), name='pool_1')(conv1)
    
    conv2 = Conv2D(128, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_2_1')(pool1)
    conv2 = tfa.layers.GroupNormalization(groups=4, axis=3)(conv2)
    conv2 = Conv2D(128, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_2_2')(conv2)
    pool2 = MaxPooling2D(pool_size=(2, 2), name='pool_2')(conv2)
    
    conv3 = Conv2D(256, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_3_1')(pool2)
    conv3 = tfa.layers.GroupNormalization(groups=4, axis=3)(conv3)
    conv3 = Conv2D(256, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_3_2')(conv3)
    pool3 = MaxPooling2D(pool_size=(2, 2), name='pool_3')(conv3)
    
    conv4 = Conv2D(512, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_4_1')(pool3)
    conv4 = tfa.layers.GroupNormalization(groups=4, axis=3)(conv4)
    conv4 = Conv2D(512, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_4_2')(conv4)
    drop4 = Dropout(0.5)(conv4)
    pool4 = MaxPooling2D(pool_size=(2, 2), name='pool_4')(drop4)

    conv5 = Conv2D(1024, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_5_1')(pool4)
    conv5 = tfa.layers.GroupNormalization(groups=4, axis=3)(conv5)
    merge5 = concatenate([conv5,v_conv2], axis = 3)
    conv5 = Conv2D(1024, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_5_2')(merge5)
    conv5 = tfa.layers.GroupNormalization(groups=4, axis=3)(conv5)
    conv5 = Conv2D(1024, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_5_3')(conv5)
    drop5 = Dropout(0.5)(conv5)

    up6 = Conv2D(512, 2, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_6_1')(UpSampling2D(size = (2,2))(drop5))
    merge6 = concatenate([drop4,up6], axis = 3)
    conv6 = Conv2D(512, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_6_2')(merge6)
    conv6 = tfa.layers.GroupNormalization(groups=4, axis=3)(conv6)
    conv6 = Conv2D(512, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_6_3')(conv6)

    up7 = Conv2D(256, 2, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_7_1')(UpSampling2D(size = (2,2))(conv6))
    merge7 = concatenate([conv3,up7], axis = 3)
    conv7 = Conv2D(256, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_7_2')(merge7)
    conv7 = tfa.layers.GroupNormalization(groups=4, axis=3)(conv7)
    conv7 = Conv2D(256, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_7_3')(conv7)

    up8 = Conv2D(128, 2, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_8_1')(UpSampling2D(size = (2,2))(conv7))
    merge8 = concatenate([conv2,up8], axis = 3)
    conv8 = Conv2D(128, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_8_2')(merge8)
    conv8 = tfa.layers.GroupNormalization(groups=4, axis=3)(conv8)
    conv8 = Conv2D(128, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_8_3')(conv8)

    up9 = Conv2D(64, 2, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_9_1')(UpSampling2D(size = (2,2))(conv8))
    merge9 = concatenate([conv1,up9], axis = 3)
    conv9 = Conv2D(64, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_9_2')(merge9)
    conv9 = tfa.layers.GroupNormalization(groups=4, axis=3)(conv9)
    conv9 = Conv2D(64, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_9_3')(conv9)
    conv9 = tfa.layers.GroupNormalization(groups=4, axis=3)(conv9)
    conv9 = Conv2D(64, 3, activation = 'relu', padding = 'same', kernel_initializer = 'he_normal', name='conv_9_4')(conv9)
    
    conv10 = Conv2D(output_size[2], 1, activation = 'sigmoid', name='image_output')(conv9)

    model = Model([image_input, vector_input], [conv10, atten_1])

    lr_schedule = tf.keras.optimizers.schedules.CosineDecay(
        0.0001,
        decay_steps=10)

    opt = tf.keras.optimizers.Adam(learning_rate=lr_schedule)

    model.compile( 
        optimizer=opt, 
        loss=[BinaryFocalLoss(gamma=1.2), 'mean_squared_error'], loss_weights=[1.0, 1e-7],
    )
    

    
    #model.summary()

    if(pretrained_weights):
    	model.load_weights(pretrained_weights)

    return model


