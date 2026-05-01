# 🚀 Feature PR Merge Order - LinguaLoop

## ⚠️ CRITICAL: This merge order MUST be followed to avoid breaking the app!

---

## Merge Sequence

### **1️⃣ FIRST: Navigation & Layout Refactor**
- **PR**: `feature/statebased-nav-v2`
- **What it does**: 
  - Refactors navigation with state-based rendering
  - Updates App.jsx with new routes
  - Creates `useSubmissionStore` hook
- **Why first**: Foundation for all other features. Sets up routing.
- **Status**: ✅ Ready for review & merge
- **⏳ After merge**: Wait for this to be merged to `dev` before merging #2

---

### **2️⃣ SECOND: Write Submission Feature** ⚠️ **CRITICAL**
- **PR**: `feature/write-submission`
- **What it does**:
  - Implements write/submission functionality
  - **Creates `submissionData.js`** with mock submissions
- **Why second**: Features #3 and #4 DEPEND on `submissionData.js`
  - Without this file, features #3 & #4 will have import errors
- **Status**: ✅ Ready for review & merge
- **⏳ After merge**: THIS UNBLOCKS features #3, #4, and #5
- **🔴 DO NOT MERGE #3 or #4 until this is merged to dev!**

---

### **3️⃣ THIRD: Correct Content Feature**
- **PR**: `feature/correct-content`
- **What it does**:
  - Implements the "correct" section for reviewing submissions
  - Uses `useSubmissionStore` to read submissions
- **Why third**: Depends on PR #2 (`submissionData.js`)
- **Status**: ✅ Ready for review & merge
- **Can merge in parallel with #4 after #2 is merged**

---

### **4️⃣ FOURTH: Corrections Review Feature**
- **PR**: `feature/corrections-review`
- **What it does**:
  - Implements the corrections/review workspace
  - Uses `useSubmissionStore` to add reviews
- **Why fourth**: Depends on PR #2 (`submissionData.js`)
- **Status**: ✅ Ready for review & merge
- **Can merge in parallel with #3 after #2 is merged**

---

### **5️⃣ FIFTH: Dashboard Feature**
- **PR**: `feature/dashboard`
- **What it does**:
  - Implements user dashboard with journey tracking
  - Independent feature with its own mock data
- **Why fifth**: No dependencies on other features
- **Status**: ✅ Ready for review & merge
- **Can merge anytime after #1, even in parallel with #2-4**

---

### **6️⃣ SIXTH: Assets & Dependencies**
- **PR**: `chore/assets-and-dependencies`
- **What it does**:
  - Adds logo asset
  - Updates package.json and package-lock.json
- **Why last**: Final cleanup, no dependencies
- **Status**: ✅ Ready for review & merge

---

## 📋 Dependency Map

```
PR #1 (Navigation)
    ↓ (merge to dev)
    
PR #2 (Write) ← CRITICAL! Creates submissionData.js
    ↓ (merge to dev - unblocks 3 & 4)
    
PR #3 (Correct) ──→ Can now merge
PR #4 (Corrections) ──→ Can now merge (parallel with #3)
PR #5 (Dashboard) ──→ Can merge anytime

All of above merged ↓

PR #6 (Assets) ──→ Merge last
```

---

## ✅ Review Checklist

For each PR being reviewed, check:

- [ ] Code compiles/builds locally
- [ ] No console errors
- [ ] Responsive design works (mobile & desktop)
- [ ] Routes are protected (if applicable)
- [ ] No merge conflicts
- [ ] Commit messages are clear and descriptive

---

## 🚨 Netlify Preview Builds

Each feature branch will have its own Netlify preview. **It's okay if they fail** because:
- Each branch is incomplete on its own
- For example, `feature/correct-content` imports from `feature/write-submission` 
- They'll all pass once merged to `dev` where all pieces exist

**Example**: The `feature/statebased-nav-v2` preview will fail because Dashboard, Write, Correct, and Corrections pages don't exist in that branch. ✅ This is expected!

---

## Summary

| Order | PR | Branch | Ready? | Blocker? |
|-------|----|----|--------|----------|
| 1 | Navigation | `feature/statebased-nav-v2` | ✅ | No - can merge immediately |
| 2 | Write | `feature/write-submission` | ✅ | **YES - blocks #3 & #4** |
| 3 | Correct | `feature/correct-content` | ✅ | Needs #2 merged first |
| 4 | Corrections | `feature/corrections-review` | ✅ | Needs #2 merged first |
| 5 | Dashboard | `feature/dashboard` | ✅ | No - can merge anytime |
| 6 | Assets | `chore/assets-and-dependencies` | ✅ | No - merge last |

---

**Questions?** Reference this guide or check the code comments in each PR for implementation details.
