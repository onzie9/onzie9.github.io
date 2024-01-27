import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
from collections import Counter

node_info = pd.read_csv("Nodes - Sheet1.csv")

needed_cols = [c for c in node_info.columns if "bor" in c]

all_cols = ['NodeName']
all_cols.extend(needed_cols)

df = node_info[all_cols]
df = df[df['Neighbor1'].notna()]
main_nodes = df['NodeName'].unique()

print(df.loc[df['NodeName']=='Tier0.1'])
ls = df.loc[df['NodeName']=='Tier0.1'].values.tolist()[0]
print(ls)
ls.pop(0)
print(ls)
G = nx.MultiDiGraph()
for mn in main_nodes:
    G.add_node(mn)
for mn in main_nodes:
    ls = df.loc[df['NodeName']==mn].values.tolist()[0]
    ls.pop(0)
    counts = Counter(ls)
    for i in range(len(ls)):
        if isinstance(ls[i], str) and 'Tier' in ls[i]:
            G.add_edge(mn, ls[i], length=counts[ls[i]]/(i+1))


nx.draw(G, with_labels=True, connectionstyle='arc3, rad = 0.1')
plt.show()

