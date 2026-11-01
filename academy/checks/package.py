"""Build one offline HTML file and a ZIP with source/license documentation."""
from pathlib import Path
import argparse,json,re,zipfile,hashlib,base64
root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser()
parser.add_argument('--out',type=Path,default=Path('/workspace/artifacts') if Path('/workspace').exists() else root/'dist')
args=parser.parse_args();out=args.out.resolve();out.mkdir(parents=True,exist_ok=True)
html=(root/'index.html').read_text()
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+(root/'style.css').read_text()+'</style>')
for name in ['vendor/three.min.js','icons.js','harbour-engine.js','course.js','scene3d.js','hud.js','app.js']:
    script=(root/name).read_text()
    if name=='scene3d.js':
        data=base64.b64encode((root/'vendor/ocean-height.png').read_bytes()).decode()
        script=script.replace("'vendor/ocean-height.png'","'data:image/png;base64,"+data+"'")
    script=re.sub(r'</script',r'<\\/script',script,flags=re.I)
    html=html.replace(f'<script src="{name}"></script>','<script>'+script+'</script>')
assert not re.search(r'<script[^>]+src=',html)
filename='Hermess Classroom.html'
(out/filename).write_text(html)
manifest={'version':'0.3.0','entry':filename,'html_sha256':hashlib.sha256(html.encode()).hexdigest(),'runtime':'offline HTML / WebGL 2 / Chromium','dependencies':[{'name':'Phosphor Icons','version':'2.1.1','license':'MIT','sha256':hashlib.sha256((root/'icons.js').read_bytes()).hexdigest()},{'name':'Generated ocean detail','purpose':'illustrative bump detail, mirrored wrapping','sha256':hashlib.sha256((root/'vendor/ocean-height.png').read_bytes()).hexdigest()},{'name':'Three.js','version':'0.160.1','license':'MIT','sha256':hashlib.sha256((root/'vendor/three.min.js').read_bytes()).hexdigest()},{'name':'Harbour Master','version':'v86','source_sha256':hashlib.sha256((root/'harbour-engine.js').read_bytes()).hexdigest()}]}
(out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
with zipfile.ZipFile(out/'Hermess-Academy-Glass-Classroom.zip','w',zipfile.ZIP_DEFLATED) as z:
    z.write(out/filename,filename)
    z.write(root/'README.md','README.md')
    z.write(root/'HARBOUR-COPYRIGHT.md','HARBOUR-COPYRIGHT.md')
    if (root/'VERIFICATION.md').exists(): z.write(root/'VERIFICATION.md','VERIFICATION.md')
    z.write(root/'vendor/THREE-LICENSE.txt','vendor/THREE-LICENSE.txt')
    z.write(root/'vendor/icons/LICENSE.txt','vendor/icons/LICENSE.txt')
    z.write(out/'manifest.json','manifest.json')
print(json.dumps({'html':str(out/filename),'zip':str(out/'Hermess-Academy-Glass-Classroom.zip'),'manifest':manifest},indent=2))
