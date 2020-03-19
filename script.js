document.addEventListener("DOMContentLoaded", function() {
  let navList = document.querySelector(".nav-list");
  let navLinks = document.querySelectorAll(".nav-link");
  let header = document.querySelector(".header");
  let sliderSection = document.querySelector(".slider");
  let slides = document.querySelectorAll(".slide");
  let phoneButtonYellow = document.querySelector(".button-overlay_yellow");
  let phoneScreenYellow = document.querySelector(".screen-overlay_yellow");
  let phoneButtonBlue = document.querySelector(".button-overlay_blue");
  let phoneScreenBlue = document.querySelector(".screen-overlay_blue");
  let getQuoteForm = document.querySelector(".get-quote__form form");
  let portfolioTags = document.querySelector(".portfolio__tags");
  let tags = document.querySelectorAll(".tag");
  let portfolioLayout = document.querySelector(".portfolio__layout-4-column");
  let projects = [
    { name: "project_1", tag: "Web design" },
    { name: "project_2", tag: "Graphic design" },
    { name: "project_3", tag: "Web design" },
    { name: "project_4", tag: "Artwork" },
    { name: "project_5", tag: "Artwork" },
    { name: "project_6", tag: "Web design" },
    { name: "project_7", tag: "Graphic design" },
    { name: "project_8", tag: "Graphic design" },
    { name: "project_9", tag: "Artwork" },
    { name: "project_10", tag: "Web design" },
    { name: "project_11", tag: "Graphic design" },
    { name: "project_12", tag: "Web design" }
  ];

  //General
  function styleClickedItems(clickedItem, array, classes, e) {
    if (e.target.tagName == clickedItem) {
      array.forEach(item => {
        item.classList.remove(classes);
      });
      e.target.classList.add(classes);
    }
  }

  function styleScrolledItems(scrolledItem, array, classes) {
    array.forEach(item => {
      item.classList.remove(classes);
    });
    scrolledItem.classList.add(classes);
  }

  // Header
  navList.addEventListener("click", function(e) {
    styleClickedItems("A", navLinks, "nav-link_active", e);
  });

  window.addEventListener("scroll", hideHeader);
  window.addEventListener("scroll", styleScrolledNavLinks);

  let lastScroll = 0;
  function hideHeader() {
    let currentScroll = window.pageYOffset;
    if (currentScroll == 0) {
      header.classList.remove("header_disabled");
    }
    if (currentScroll > lastScroll) {
      header.classList.add("header_disabled");
    } else if (currentScroll < lastScroll) {
      header.classList.remove("header_disabled");
    }
    lastScroll = currentScroll;
  }

  function styleScrolledNavLinks() {
    const headerHeight = 96;
    let homeSectionHeight = document.querySelector(".slider").offsetHeight;
    let servicesSectionHeight = document.querySelector(".our-services").offsetHeight;
    let portfolioSectionHeight = document.querySelector(".portfolio").offsetHeight;
    let aboutSectionHeight = document.querySelector(".about-us").offsetHeight;

    let navLinkHome = document.querySelector(".nav-link_home");
    let navLinkServices = document.querySelector(".nav-link_services");
    let navLinkPortfolio = document.querySelector(".nav-link_portfolio");
    let navLinkAbout = document.querySelector(".nav-link_about");
    let navLinkContact = document.querySelector(".nav-link_contact");

    if (window.pageYOffset < homeSectionHeight)
      styleScrolledItems(navLinkHome, navLinks, "nav-link_active");
    if (window.pageYOffset > homeSectionHeight - headerHeight)
      styleScrolledItems(navLinkServices, navLinks, "nav-link_active");
    if (
      window.pageYOffset >
      homeSectionHeight + servicesSectionHeight - headerHeight
    )
      styleScrolledItems(navLinkPortfolio, navLinks, "nav-link_active");
    if (
      window.pageYOffset >
      homeSectionHeight +
      servicesSectionHeight +
      portfolioSectionHeight -
      headerHeight
    )
      styleScrolledItems(navLinkAbout, navLinks, "nav-link_active");
    if (
      window.pageYOffset >
      homeSectionHeight +
      servicesSectionHeight +
      portfolioSectionHeight +
      aboutSectionHeight -
      headerHeight
    )
      styleScrolledItems(navLinkContact, navLinks, "nav-link_active");
  }

  //Slider carousel
  let currentSlide = 0;
  let isEnabled = true;

  function changeCurrentSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
  }

  document
    .querySelector(".ico_chevron-left")
    .addEventListener("click", function() {
      if (isEnabled) {
        setPreviousSlide(currentSlide);
        sliderSection.classList.toggle("slider_bg_pink");
        sliderSection.classList.toggle("slider_bg_blue");
      }
    });

  document
    .querySelector(".ico_chevron-right")
    .addEventListener("click", function() {
      if (isEnabled) {
        setNextSlide(currentSlide);
        sliderSection.classList.toggle("slider_bg_pink");
        sliderSection.classList.toggle("slider_bg_blue");
      }
    });

  function setPreviousSlide(n) {
    hideSlide("to-right");
    changeCurrentSlide(n - 1);
    showSlide("from-left");
  }

  function setNextSlide(n) {
    hideSlide("to-left");
    changeCurrentSlide(n + 1);
    showSlide("from-right");
  }

  function hideSlide(direction) {
    isEnabled = false;
    slides[currentSlide].classList.add(direction);
    slides[currentSlide].addEventListener("animationend", function() {
      this.classList.remove("slide_active", direction);
    });
  }

  function showSlide(direction) {
    slides[currentSlide].classList.add("slide_next", direction);
    slides[currentSlide].addEventListener("animationend", function() {
      this.classList.remove("slide_next", direction);
      this.classList.add("slide_active");
      isEnabled = true;
    });
  }

  //Slider phones
  phoneButtonYellow.addEventListener("click", function() {
    phoneScreenYellow.classList.toggle("screen-overlay_yellow_active");
  });

  phoneButtonBlue.addEventListener("click", function() {
    phoneScreenBlue.classList.toggle("screen-overlay_yellow_active");
  });

  //Portfolio
  function updateProjectMarkup(project) {
    let portfolioProject = document.createElement("div");
    portfolioProject.classList.add("portfolio__project");
    portfolioProject.classList.add(`${project.name}`);
    return portfolioProject;
  }

  function updatePortfolioMarkup(arr) {
    portfolioLayout.innerHTML = "";
    arr.forEach(item => {
      let project = updateProjectMarkup(item);
      portfolioLayout.append(project);
    });

    let portfolioProjects = document.querySelectorAll(".portfolio__project");
    portfolioLayout.addEventListener("click", function(e) {
      styleClickedItems("DIV", portfolioProjects, "portfolio__project_active", e);
    });
  }
  updatePortfolioMarkup(projects);

  portfolioTags.addEventListener("click", function(e) {
    styleClickedItems("SPAN", tags, "tag_active", e);
    let tagName = e.target.textContent;
    if (tagName === "All") updatePortfolioMarkup(projects);
    else {
      updatePortfolioMarkup(
        projects.filter(project => project.tag === tagName)
      );
    }
  });

  //Get Quote
  getQuoteForm.onsubmit = function(e) {
    e.preventDefault();
    showModal();
  };

  function showModal() {
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let quoteStatement = document.createElement("p");
    quoteStatement.classList.add("get-quote__statement");
    quoteStatement.textContent = "The letter was sent";

    let formSubject = document.querySelector(".form__subject").value;
    let quoteTheme = document.createElement("p");
    quoteTheme.classList.add("get-quote__theme");
    if (formSubject) {
      quoteTheme.textContent = `Subject: ${formSubject}`;
    } else {
      quoteTheme.textContent = "Without subject ";
    }

    let formDetails = document.querySelector(".form__details").value;
    let quoteDetails = document.createElement("p");
    quoteDetails.classList.add("get-quote__details");
    if (formDetails) {
      quoteDetails.textContent = `Description: ${formDetails}`;
    } else {
      quoteDetails.textContent = "Without description";
    }

    let closeModalButton = document.createElement("button");
    closeModalButton.classList.add("button");
    closeModalButton.classList.add("button_primary");
    closeModalButton.textContent = "OK";
    closeModalButton.addEventListener("click", closeModal);

    modal.append(quoteStatement, quoteTheme, quoteDetails, closeModalButton);
    overlay.append(modal);
    document.body.prepend(overlay);
  }

  function closeModal() {
    document.querySelector(".overlay").remove();
    document.querySelector(".form__name").value = "";
    document.querySelector(".form__email").value = "";
    document.querySelector(".form__subject").value = "";
    document.querySelector(".form__details").value = "";
  }
});
