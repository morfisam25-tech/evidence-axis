# Transcend Gift #16 — delivery upload gate

Delivery slug:

`transcend-brief-3375bdf7`

Upload the two FINAL recipient-facing PDFs into this exact folder in the same GitHub commit:

- `deck.pdf`
- `appendix.pdf`

Use these exact local source files:

- Executive Brief: `Evidence_Axis_Transcend_OneTrust_CD-GIFT-01_Executive_Brief_CD22_REVISED.pdf`
  - bytes: `39796`
  - MD5: `b657ef2f1c8f3a0aae1a4a6664b0d177`
  - SHA-256: `20de1eba8737a650e4bf4853606d72bd9f6b3cd8e35f60aac1fee81f7580efad`

- Evidence Appendix: `Evidence_Axis_Transcend_OneTrust_CD-GIFT-01_Evidence_Appendix_CD23_CD25_FINAL_R2.pdf`
  - bytes: `956553`
  - MD5: `3a5813daad563873f84e5fdd102ee5ae`
  - SHA-256: `f1c2e7e2390ce884f409696b23b556622a82de2a08708ed7442e08f8b180c0b3`

Do not upload Research OS, source workbooks, internal QA renders, drafts or source notes.

The private delivery page is already wired to:

- `/deliveries/transcend-brief-3375bdf7/deck.pdf`
- `/deliveries/transcend-brief-3375bdf7/appendix.pdf`

After both PDFs are present, the Transcend G-00 workflow should verify:

1. `delivery-page-viewed`
2. `executive-deck-opened`
3. `evidence-appendix-opened`
4. `decision-conversation-clicked`

Production URL after deploy:

`https://evidenceaxis.com/intelligence/transcend-brief-3375bdf7/`

Customer send remains BLOCKED until:

- production page returns 200
- both PDFs return 200 with exact SHA-256 values above
- noindex is present
- all four first-party tracking events are recorded by `/api/track`
- scanner-classified smoke does not emit an email copy
- independent human production check is complete
- Conflict Check B passes immediately before delivery
