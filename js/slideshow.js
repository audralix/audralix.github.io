/*===== SLIDESHOW =====*/
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" slideActive", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " slideActive";
}

// 1. Slides data (9 phases)
/* const slides = [
  {
    phase: "Phase 1",
    img: "/assets/LoanApplicationRedesign/Phase-1.jpg",
    keyData: "The business information is associated with a CRO number.",
    assumption:
      "CRO number can be auto-fetched earlier to reduce manual entry.",
  },
  {
    phase: "Phase 2",
    img: "/assets/LoanApplicationRedesign/Phase-2.jpg",
    keyData: "Partner searches for CRO and enters company details.",
    assumption:
      "Pre-filling company data from CRO + Revenue would reduce errors.",
  },
  {
    phase: "Phase 3",
    img: "/assets/LoanApplicationRedesign/Phase-3.jpg",
    keyData: "Funding requirement and loan purpose are captured.",
    assumption:
      "Clear product rules could surface a recommended finance product.",
  },
  {
    phase: "Phase 4",
    img: "/assets/LoanApplicationRedesign/Phase-1.jpg",
    keyData: "Declarations and compliance confirmations are required.",
    assumption:
      "Surfacing missing regulatory requirements early reduces delays.",
  },
  {
    phase: "Phase 5",
    img: "/assets/LoanApplicationRedesign/Phase-2.jpg",
    keyData: "Signatories must be collected for the loan application.",
    assumption:
      "Auto-identifying signatory count based on company type saves time.",
  },
  {
    phase: "Phase 6",
    img: "/assets/LoanApplicationRedesign/Phase-3.jpg",
    keyData: "Partner submits KYC/KYB information for review.",
    assumption:
      "Prefilling company data reduces KYC discrepancies and resubmissions.",
  },
  {
    phase: "Phase 7",
    img: "/assets/LoanApplicationRedesign/Phase-1.jpg",
    keyData: "Partner connects bank accounts through Open Banking.",
    assumption:
      "Showing eligibility signal before Open Banking increases conversion.",
  },
  {
    phase: "Phase 8",
    img: "/assets/LoanApplicationRedesign/Phase-2.jpg",
    keyData: "Partner uploads supporting documents.",
    assumption:
      "Dynamic document checklists prevent missing or invalid uploads.",
  },
  {
    phase: "Phase 9",
    img: "/assets/LoanApplicationRedesign/Phase-3.jpg",
    keyData: "Application is reviewed and submitted to IEFinance.",
    assumption:
      "Real-time validation signals reduce back-and-forth with brokers.",
  },
]; */
