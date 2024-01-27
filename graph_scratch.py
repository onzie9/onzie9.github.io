import networkx as nx
import matplotlib.pyplot as plt
from IPython.display import Image
import pandas as pd

node_info = pd.read_csv("Nodes - Sheet1.csv")

needed_cols = [c for c in node_info.columns if "bor" in c]

all_cols = ['NodeName']
all_cols.extend(needed_cols)

df = node_info[all_cols]
df = df[df['Neighbor1'].notna()]
main_nodes = df['NodeName'].unique()

G=nx.MultiGraph ()


G.add_edge(1,2,weight=1)
G.add_edge(1,2,weight=2)
G.add_edge(1,2,weight=3)
G.add_edge(3,1,weight=4)
G.add_edge(3,2,weight=5)
for edge in G.edges(data=True): edge[2]['label'] = edge[2]['weight']
node_label = nx.get_node_attributes(G,'id')
pos = nx.spring_layout(G)
node_label = nx.get_node_attributes(G,'id')
pos = nx.spring_layout(G)
p=nx.drawing.nx_pydot.to_pydot(G)
p.write_png('multi.png')
Image(filename='multi.png')
plt.show()