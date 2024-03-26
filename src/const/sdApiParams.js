export const data = {
  // userId: '123456',
  init_images: [], // Original image address
  denoising_strength: 0, // Range 0-1, smaller value closer to original image. Larger value more likely to let imagination fly
  prompt: '',
  negative_prompt: '',
  seed: -1, // Initial seed
  batch_size: 1, // How many images generated each time
  n_iter: 1, // number of iterations
  steps: 50, // Number of runs, this value can be fine tuned, converging when too high, max 150 in webui, maybe can go higher here?
  cfg_scale: 7, // Influence of prompt text on image, usually 5-15, max 30 in webui, can fine tune
  // width: 1282,
  // height: 1708,
  restore_faces: false, // Whether to correct faces, for 3D, test later if open or not. Suggest False for now
  sampler_name: 'DPM++ 2M Karras',
  sampler_index: 'DPM++ 2M Karras', // or "DPM++ 2M Karras"
  // override_settings: {
  //   // sd_model_checkpoint: 'majicmixRealistic_v6.safetensors',
  //   sd_model_checkpoint: 'Anything-ink.safetensorss',
  // },
  alwayson_scripts: {
    roop: {
      is_img2img: true,
      is_alwayson: true,
      args: [
        '', //0 File Input
        true, //1 Enable Roop
        '0', //2 Comma separated face number(s)
        // '/home/vipuser/code/stable_diffusion_webui/models/roop/inswapper_128.onnx', //3 Model
        '/root/stable-diffusion-webui/models/roop/inswapper_128.onnx', //3 Model
        'CodeFormer', //4 Restore Face: None; CodeFormer; GFPGAN
        1, //5 Restore visibility value
        true, //6 Restore face -> Upscale
        'None', //7 Upscaler (type 'None' if doesn't need), see full list here: http://127.0.0.1:7860/sdapi/v1/script-info -> roop-ge -> sec.8
        1, //8 Upscaler scale value
        1, //9 Upscaler visibility (if scale = 1)
        false, //10 Swap in source image
        true, //11 Swap in generated image
      ],
    },
    // "ADetailer": {
    //     "args": adtail_args
    // },
    // "controlnet": {
    //     "args": controlnet_args,
    // },
  },
  // "script_name" : "ultimate sd upscale",
  // "script_args" : ultimate_sd_upscale_args
};

//2、换脸+增加脸部细节
export const swap_face_and_add_detail_data = {
  // userId: '123456',
  init_images: [], // Original image address
  denoising_strength: 0, // Range 0-1, smaller value closer to original image. Larger value more likely to let imagination fly
  prompt: '<lora:pytorch_lora_weights:1>',
  negative_prompt: 'EasyNegative',
  seed: -1, // Initial seed
  batch_size: 1, // How many images generated each time
  n_iter: 1, // number of iterations
  steps: 5, // Number of runs, this value can be fine tuned, converging when too high, max 150 in webui, maybe can go higher here?
  cfg_scale: 1, // Influence of prompt text on image, usually 5-15, max 30 in webui, can fine tune
  restore_faces: false, // Whether to correct faces, for 3D, test later if open or not. Suggest false for now
  sampler_name: 'Euler a',
  sampler_index: 'Euler a', // or "DPM++ 2M Karras"
  override_settings: {
    sd_model_checkpoint: 'majicmixRealistic_v6.safetensors',
  },
  alwayson_scripts: {
    roop: {
      is_img2img: true,
      is_alwayson: true,
      args: [
        '', //0 File Input
        true, //1 Enable Roop
        '0', //2 Comma separated face number(s)
        '/home/vipuser/code/' +
          'stable_diffusion_webui/models/roop/inswapper_128.onnx', //3 Model
        'CodeFormer', //4 Restore Face: None; CodeFormer; GFPGAN
        1, //5 Restore visibility value
        true, //6 Restore face -> Upscale
        'None', //7 Upscaler (type 'None' if doesn't need), see full list here: http://127.0.0.1:7860/sdapi/v1/script-info -> roop-ge -> sec.8
        1, //8 Upscaler scale value
        1, //9 Upscaler visibility (if scale = 1)
        false, //10 Swap in source image
        true, //11 Swap in generated image
      ],
    },
    ADetailer: {
      args: [
        true,
        {
          ad_model: 'mediapipe_face_full',
          ad_prompt: '',
          ad_negative_prompt: '',
          ad_confidence: 0.3,
          ad_mask_k_largest: 0,
          ad_mask_min_ratio: 0.0,
          ad_mask_max_ratio: 1.0,
          ad_dilate_erode: 32,
          ad_x_offset: 0,
          ad_y_offset: 0,
          ad_mask_merge_invert: 'None',
          ad_mask_blur: 4,
          ad_denoising_strength: 0.4, //增加的细节幅度，最大为1
          ad_inpaint_only_masked: true,
          ad_inpaint_only_masked_padding: 32,
          ad_use_inpaint_width_height: false,
          ad_inpaint_width: 512,
          ad_inpaint_height: 512,
          ad_use_steps: false,
          ad_steps: 5,
          ad_use_cfg_scale: false,
          ad_cfg_scale: 1.5,
          ad_use_sampler: false,
          ad_sampler: 'Euler a',
          ad_use_noise_multiplier: false,
          ad_noise_multiplier: 1.0,
          ad_use_clip_skip: false,
          ad_clip_skip: 1,
          ad_restore_face: false,
          ad_controlnet_model: 'control_v11f1e_sd15_tile [a371b31b]',
          ad_controlnet_module: null,
          ad_controlnet_weight: 1.0,
          ad_controlnet_guidance_start: 0.0,
          ad_controlnet_guidance_end: 1.0,
        },
      ],
    },
  },
};

//3、超分：默认放大1.5倍
export const scale_data = {
  // userId: '123456',
  init_images: [], // Original image address
  denoising_strength: 0.4, // Range 0-1, smaller value closer to original image. Larger value more likely to let imagination fly
  prompt: '<lora:pytorch_lora_weights:1>',
  negative_prompt: '',
  seed: -1, // Initial seed
  batch_size: 1, // How many images generated each time
  n_iter: 1, // number of iterations
  steps: 5, // Number of runs, this value can be fine tuned, converging when too high, max 150 in webui, maybe can go higher here?
  cfg_scale: 1.5, // Influence of prompt text on image, usually 5-15, max 30 in webui, can fine tune
  restore_faces: false, // Whether to correct faces, for 3D, test later if open or not. Suggest false for now
  sampler_name: 'DPM++ 2M Karras',
  sampler_index: 'DPM++ 2M Karras', // or "DPM++ 2M Karras"
  override_settings: {
    sd_model_checkpoint: 'majicmixRealistic_v6.safetensors',
  },
  script_name: 'ultimate sd upscale',
  script_args: [
    null, // _ (not used)
    512, // tile_width
    512, // tile_height
    8, // mask_blur
    32, // padding
    64, // seams_fix_width
    0.35, // seams_fix_denoise
    32, // seams_fix_padding
    1, // upscaler_index
    true, // save_upscaled_image a.k.a Upscaled
    0, // redraw_mode:"Linear","Chess","null"
    false, // save_seams_fix_image a.k.a Seams fix
    8, // seams_fix_mask_blur
    0, // seams_fix_type
    2, // target_size_type
    1080, // custom_width
    1920, // custom_height
    1.5, // custom_scale:当upscaler_index为3时，该值决定输出的倍数
  ],
};

//4、局部重绘
export const mask_data = {
  // userId: '123456',
  init_images: [], // Original image address
  denoising_strength: 0.4, // Range 0-1, smaller value closer to original image. Larger value more likely to let imagination fly
  prompt: '<lora:pytorch_lora_weights:1>',
  negative_prompt: 'EasyNegative',
  mask: '', //base64蒙版图片，宽高必须和init_images一致
  mask_blur: 4,
  mask_blur_x: 4,
  mask_blur_y: 4,
  inpainting_mask_invert: 0,
  inpaint_full_res: 1, //["Whole picture", "Only masked"]
  inpainting_fill: 1, //['fill', 'original', 'latent noise', 'latent nothing']
  inpaint_full_res_padding: 32,
  seed: -1, // Initial seed
  batch_size: 1, // How many images generated each time
  n_iter: 1, // number of iterations
  steps: 3, // Number of runs, this value can be fine tuned, converging when too high, max 150 in webui, maybe can go higher here?
  cfg_scale: 1, // Influence of prompt text on image, usually 5-15, max 30 in webui, can fine tune
  restore_faces: false, // Whether to correct faces, for 3D, test later if open or not. Suggest false for now
  sampler_name: 'DPM++ 2M Karras',
  sampler_index: 'DPM++ 2M Karras', // or "DPM++ 2M Karras"
  override_settings: {
    sd_model_checkpoint: 'majicmixRealistic_v6.safetensors',
  },
};

//5、转漫画
export const animeMix = {
  // userId: '123456',
  init_images: [], // Original image address
  denoising_strength: 0.8, // Range 0-1, smaller value closer to original image. Larger value more likely to let imagination fly
  prompt:
    '1girl(solo,Eyes(Deep amber,crystal clear,long and delicate eyelashes),Nose(Elevated,a slightly upturned nose tip),Lips(Rosy color,defined lip line),Hairstyle(Black hair,smooth and shiny,slightly wavy at the ends),Clothing(glass,KKKL,(white long wedding dress,fashion clothing design,gorgeous):1.5,(full_shot,wide_shot,upskirt,from_below,look at viewer,floating hair,outdoor,upper half body):1.53), Background((full moon,forest,grassland):1.5,sky,lake), masterpiece,best quality,unreal engine 5 rendering,movie light,movie lens,movie special effects,detailed details,HDR,UHD,8K,CG wallpaper,',
  negative_prompt:
    'nfsw,EasyNegative, paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, glans,extra fingers,fewer fingers,strange fingers,bad hand,backlight, (worst quality, low quality:1.4), watermark, logo, bad anatomy,lace,rabbit,back,',
  seed: -1, // Initial seed
  batch_size: 1, // How many images generated each time
  n_iter: 1, // number of iterations
  steps: 30, // Number of runs, this value can be fine tuned, converging when too high, max 150 in webui, maybe can go higher here?
  cfg_scale: 1, // Influence of prompt text on image, usually 5-15, max 30 in webui, can fine tune
  restore_faces: false, // Whether to correct faces, for 3D, test later if open or not. Suggest false for now
  sampler_name: 'DPM++ 2M Karras',
  sampler_index: 'DPM++ 2M Karras', // or "DPM++ 2M Karras"
  override_settings: {
    sd_model_checkpoint: 'AWPainting_v1.3.safetensors [5a44dad2e0]',
    // sd_model_checkpoint:
    // 'Chilloutmix-Ni-pruned-fp16-fix.safetensors [59ffe2243a]',
    sd_vae: 'Automatic',
  },
  alwayson_scripts: {
    controlnet: {
      args: [
        {
          enabled: true,
          module: 'canny', //invert (from white bg & black line)
          model: 'control_v11p_sd15_canny [d14c016b]',
          // module: 'openpose_full',//animal_openpose/densepose (pruple bg & purple torso)/densepose_parula (black bg & blue torso)/dw_openpose_full/openpose/openpose_face/openpose_faceonly/openpose_hand
          // model: 'control_v11p_sd15_openpose_fp16 [73c2b67d]',
          // module: 'depth_midas',//depth_anything/depth_hand_refiner/depth_leres/depth_leres++/depth_midas/depth_zoe
          // model: 'control_v11f1p_sd15_depth_fp16 [4b72d323]',
          // module: 'lineart_standard (from white bg & black line)',//lineart_anime/lineart_anime_denoise/lineart_coarse/lineart_realistic/invert (from white bg & black line)
          // model: 'control_v11p_sd15s2_lineart_anime_fp16 [c58f338b]',
          // module: 'tile_resample',//tile_colorfix+sharp/tile_colorfix/blur_gaussian
          // model: 'control_v11f1e_sd15_tile [a371b31b]',
          // module: 'ip-adapter_clip_sd15', //proce:ip-adapter_clip_sd15/ip-adapter_face_id/ip-adapter_face_id_plus
          // model: 'ip-adapter_sd15_plus [32cd8f7f]',//ip-adapter-full-face_sd15 [3459c5eb]
          // module: 'Instant_ID',
          weight: 1.0,
          image: '',
          resize_mode: 1,
          low_vram: true,
          processor_res: 512,
          threshold_a: 64,
          threshold_b: 64,
          guidance_start: 0.0,
          guidance_end: 1.0,
          pixel_perfect: true,
          control_mode: 0,
        },
      ],
    },
  },
};

// https://blog.51cto.com/coderaction/7056631
// input_image : 用于此单元的图像。默认为 null

// mask : 用于过滤图像的掩码 pixel_perfect。默认为 null

// module : 在将图像传递给此单元之前在其上使用的预处理器。接受/controlnet/module_list 路由返回的值。默认为 none

// model : 用于此单元中的调节的模型的名称。接受/controlnet/model_list 路由返回的值。默认为 None

// weight : 此单元的权重。默认为 1

// resize_mode : 如何调整输入图像以适应生成的输出分辨率。默认为 Scale to Fit (Inner Fit)。接受的值为：

// 0 或 Just Resize：只需将图像调整为目标宽度/高度

// 1 或 Scale to Fit (Inner Fit)：按比例缩放和裁剪以适应最小尺寸。保持比例。

// 2 或 Envelope (Outer Fit)：按比例缩放以适应最大尺寸。保持比例。

// lowvram : 是否通过处理时间来补偿低 GPU 内存。默认为 false

// processor_res : 预处理器的分辨率。默认为 64

// threshold_a : 预处理器的第一个参数。仅在预处理器接受参数时生效。默认为 64

// threshold_b : 预处理器的第二个参数，用法与上述相同。默认为 64

// guidance_start : 此单元开始发挥作用的生成比例。默认为 0.0

// guidance_end : 此单元停止发挥作用的生成比例。默认为 1.0

// control_mode : 有关用法，请参见相关问题。默认为 0。接受的值为：

// 0 或 Balanced：平衡，对提示和控制模型没有偏好

// 1 或 My prompt is more important：提示比模型更有影响力

// 2 或 ControlNet is more important：控制网络模型比提示更有影响力

// pixel_perfect : 启用像素完美的预处理器。默认为 false
