function animateText() {
    const text = document.getElementById("welcome-text");
    text.classList.add("animate");
  
    setTimeout(() => {
      text.classList.remove("animate");
    }, 1000);
  }
  