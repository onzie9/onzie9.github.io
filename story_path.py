from functions import *

import networkx as nx
import matplotlib.pyplot as plt
from IPython.display import Image
import pandas as pd
from collections import Counter
import io
import matplotlib.image as mpimg


node_info = pd.read_csv("Nodes - Sheet1.csv")

needed_cols = [c for c in node_info.columns if "bor" in c]

all_cols = ['NodeName']
all_cols.extend(needed_cols)

df = node_info[all_cols]
df = df[df['Neighbor1'].notna()]
main_nodes = df['NodeName'].unique()

G=nx.MultiGraph ()

for mn in main_nodes:
    ls = df.loc[df['NodeName']==mn].values.tolist()[0]
    ls.pop(0)
    counts = Counter(ls)
    for i in range(len(ls)):
        if isinstance(ls[i], str) and 'Tier' in ls[i]:
            G.add_edge(mn, ls[i])

node_label = nx.get_node_attributes(G,'id')
pos = nx.spring_layout(G)
node_label = nx.get_node_attributes(G,'id')
pos = nx.spring_layout(G)
p=nx.drawing.nx_pydot.to_pydot(G)
# render the `pydot` by calling `dot`, no file saved to disk
png_str = p.create_png(prog='dot')

# treat the DOT output as an image file
sio = io.BytesIO()
sio.write(png_str)
sio.seek(0)
img = mpimg.imread(sio)

# plot the image
imgplot = plt.imshow(img, aspect='equal')
plt.show()
p.write_png('multi.png')

Image(filename='multi.png')
