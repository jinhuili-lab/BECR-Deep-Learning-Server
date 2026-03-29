# Overview

This project presents a multimodal deep learning framework for BECR prediction using three complementary information sources:

- Sequence-derived representations
- Position-specific scoring matrices (PSSM)
- Contact-map transformer (CMT) features

The framework integrates the three branches through a late-fusion strategy and subsequently compresses the full model into a lightweight sequence-only predictor via knowledge distillation.

## Motivation

Traditional sequence-only predictors frequently fail to capture long-range residue interactions and evolutionary constraints. We therefore combine:

1. Raw sequence embeddings
2. Evolutionary profiles
3. Structural contact information

The predictive score is defined as:

$$
P(y=1|x)=\sigma(f_{fusion}(x))
$$

## Example Figure

![Dataset overview](../assets/architecture/dataset_overview.png)
