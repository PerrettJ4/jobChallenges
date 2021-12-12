

import numpy as np
from numpy import exp
import pandas as pd

import matplotlib.pyplot as pl


df = pd.read_excel('./House List.csv')
c = np.array(df)
print("Contact matrix:\n", c, "\n")
