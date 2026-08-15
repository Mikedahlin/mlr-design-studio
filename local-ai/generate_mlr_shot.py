import os, torch
os.environ['HF_HOME']=r'D:\AI\huggingface'
from diffusers import WanPipeline
from diffusers.utils import export_to_video
model=r'D:\AI\models\Wan2.1-T2V-1.3B-Diffusers'
pipe=WanPipeline.from_pretrained(model,torch_dtype=torch.bfloat16)
pipe.enable_model_cpu_offload()
pipe.vae.enable_tiling()
pipe.vae.enable_slicing()
prompt='Cinematic black and white 16mm editorial film, a lone figure walks through monumental modern architecture at dawn, hard shafts of light through drifting mist, close-up cut to hands working with tactile materials, elegant luxury brand campaign, sophisticated composition, authentic analog grain, subtle handheld camera movement, deep blacks, luminous highlights, photorealistic, no text, no logos, no website screens'
negative='color, text, logo, typography, website, computer screen, slideshow, still image, split screen, frame border, cartoon, illustration, low quality, distorted hands, flicker, jitter, watermark'
g=torch.Generator(device='cpu').manual_seed(84721)
out=pipe(prompt=prompt,negative_prompt=negative,height=480,width=832,num_frames=49,num_inference_steps=24,guidance_scale=5.5,generator=g).frames[0]
os.makedirs(r'D:\AI\outputs',exist_ok=True)
export_to_video(out,r'D:\AI\outputs\mlr-cinematic-shot-01.mp4',fps=16)
print('GENERATED',len(out))
