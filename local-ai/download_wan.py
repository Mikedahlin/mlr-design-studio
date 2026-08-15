import os
os.environ['HF_HOME']=r'D:\AI\huggingface'
from huggingface_hub import snapshot_download
p=snapshot_download('Wan-AI/Wan2.1-T2V-1.3B-Diffusers',local_dir=r'D:\AI\models\Wan2.1-T2V-1.3B-Diffusers')
print(p)
