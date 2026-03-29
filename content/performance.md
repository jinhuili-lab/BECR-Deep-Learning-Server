# Comparative Performance

The multimodal fusion framework consistently outperformed all single-modality baselines across independent train/test splits.

| Model | AUC | MCC | F1 |
|------|------|------|------|
| Sequence only | 0.961 | 0.842 | 0.914 |
| PSSM only | 0.884 | 0.632 | 0.781 |
| CMT only | 0.923 | 0.741 | 0.846 |
| Fusion model | 0.972 | 0.881 | 0.931 |

## Key Findings

- Fusion produced the highest AUC and MCC.
- Sequence features remained the dominant signal.
- PSSM and structural features provided complementary improvements.
