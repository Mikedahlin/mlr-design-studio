import os, time, torch
from diffusers import WanPipeline
from diffusers.utils import export_to_video
MODEL=r'D:\AI\models\Wan2.1-T2V-1.3B-Diffusers'
OUT=r'D:\AI\outputs\mlr-material-intake-test-01.mp4'
PROMPT='''A restrained macro cinematic shot in a pitch-black studio. A futuristic precision instrument made from blackened metal, polished chrome, and optical glass awakens in darkness. Six distinct raw materials—brushed steel and concrete dust, glowing carbon embers, oily black automotive metal, luminous white porcelain, wet cedar with lake mist, and deep black velvet with liquid pigment—are pulled into six transparent glass intake channels. The instrument compresses them into extremely bright cyan, magenta, acid-green, violet, cold-white, and warm-ember liquid energy. Photorealistic premium commercial cinematography, deep pure blacks, vivid reflections on chrome, static camera with an extremely slow push in, no people, no words, no logo, no audio.'''
NEG='''text, letters, words, logo, watermark, UI, website, slideshow, split screen, people, faces, cartoon, low resolution, blurry, malformed machinery, camera shake, gray background, lifted blacks'''
os.makedirs(os.path.dirname(OUT),exist_ok=True)
print('loading',MODEL,flush=True); t=time.time()
pipe=WanPipeline.from_pretrained(MODEL,torch_dtype=torch.bfloat16)
pipe.enable_model_cpu_offload(); pipe.vae.enable_tiling(); pipe.vae.enable_slicing()
print('loaded_seconds',round(time.time()-t,1),flush=True); t=time.time()
g=torch.Generator(device='cpu').manual_seed(8142026)
result=pipe(prompt=PROMPT,negative_prompt=NEG,height=272,width=480,num_frames=33,num_inference_steps=14,guidance_scale=5.0,generator=g).frames[0]
print('render_seconds',round(time.time()-t,1),'frames',len(result),flush=True)
export_to_video(result,OUT,fps=16)
print('OUTPUT',OUT,os.path.getsize(OUT),flush=True)
