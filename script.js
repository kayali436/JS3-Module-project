const headerLayout = document.querySelector(".headerLayout");
const rootDiv = document.getElementById("root");
const showsAndEpisodeSearch = document.getElementById("showsAndEpisodeSearch");
const showDropDown = document.getElementById("showSelect");
const episodeDropDown = document.getElementById("episodeSelect");
const forSVG = document.createElement("div");

let defaultOption = document.createElement("option");
defaultOption.setAttribute("value", "default");
defaultOption.textContent = "Please Select...";

forSVG.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 forSVG">
<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
</svg>`;
headerLayout.insertAdjacentElement("afterbegin", forSVG);
forSVG.addEventListener("click", function () {
  rootDiv.innerHTML = "";
  render();
  showsAndEpisodeSearch.value = "";
  episodeDropDown.style.display = "None";
  showDropDown.value = "default";
});

showsAndEpisodeSearch.addEventListener("input", searchFilterEpisodes);

// fetching tvmaze api

async function fetchShows() {
  return await fetch("https://api.tvmaze.com/shows")
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching shows:", error));
}

async function fetchEpisodes(currentShowsID) {
  try {
    const res = await fetch(
      `https://api.tvmaze.com/shows/${currentShowsID}/episodes`
    );
    currentShowsID = null;
    if (!res.ok) {
      throw new Error("Could not fetch episodes data");
    } else {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
}

async function searchFilterEpisodes() {
  const accessShows = await fetchShows();
  // Gets value from keyboard input and turns into lowercase
  const keyboardInput = showsAndEpisodeSearch.value.toLowerCase();
  // Filters through the episodes to find the ones that match the searchfield
  const filterShows = accessShows.filter(
    (episode) =>
      episode.name.toLowerCase().includes(keyboardInput) ||
      episode.summary.toLowerCase().includes(keyboardInput)
  );
  // Clears all the existing cards
  rootDiv.innerHTML = "";
  // Creates new cards based upon the filtered episodes
  makePageForEpisodes(filterShows);

  // Resets the dropdown menu to default
  showDropDown.value = "default";
}

async function dropDownFilter() {
  showDropDown.appendChild(defaultOption);
  const accessShows = await fetchShows();

  accessShows.forEach((episode) => {
    const options = document.createElement("option");
    options.textContent = episode.name;
    showDropDown.appendChild(options);
  });
  showDropDown.addEventListener("input", async function (clickEpisode) {
    if (clickEpisode.target.value === "default") {
      episodeDropDown.style.display = "none";
      rootDiv.innerHTML = "";
      render();
    } else {
      rootDiv.innerHTML = "";
      const findEpisodesID = accessShows.find(
        (episode) => episode.name === clickEpisode.target.value
      );
      const fetchAllEpisodes = await fetchEpisodes(findEpisodesID.id);
      makePageForShows(fetchAllEpisodes);
      showsAndEpisodeSearch.value = "";
      episodeDropDown.innerHTML = "";
      episodeDropDownFilter(fetchAllEpisodes);
    }
  });
}

dropDownFilter();

async function episodeDropDownFilter(episodes) {
  episodes.forEach((episode) => {
    const option = createClassAndElement("option", "");
    option.textContent = episode.name;
    episodeDropDown.appendChild(option);
    episodeDropDown.style.display = "Block";
  });

  episodeDropDown.addEventListener("input", function (event) {
    const findEpisode = episodes.filter(
      (episode) => episode.name === event.target.value
    );
    rootDiv.innerHTML = "";
    makePageForShows(findEpisode);
    // showsAndEpisodeSearch.value = "";
    // episodeDropDownFilter(fetchAllEpisodes)
  });
}

function createClassAndElement(tag, className) {
  const element = document.createElement(tag);
  if (className) {
    element.classList.add(className);
  }
  return element;
}

async function makePageForEpisodes(episodes) {
  const rootElem = document.getElementById("root");

  episodes.forEach((episode) => {
    const card = createClassAndElement("div", "title-div");

    card.addEventListener("click", async () => {
      const episodeSelected = await fetchEpisodes(episode.id);
      rootDiv.innerHTML = "";
      makePageForShows(episodeSelected);
    });

    rootElem.appendChild(card);

    const seasonName = episode.name;
    const episodeCode = seasonName;

    const season = createClassAndElement("h1", "title");
    season.textContent = episodeCode;
    card.appendChild(season);

    const imgElement = createClassAndElement("img");
    imgElement.setAttribute("src", episode.image.medium);
    card.appendChild(imgElement);

    const summary = createClassAndElement("h4");
    summary.innerHTML = episode.summary;
    card.appendChild(summary);

    const genres = createClassAndElement("p", "genres");
    genres.textContent = episode.genres;
    card.appendChild(genres);

    const status = createClassAndElement("p", "status");
    status.textContent = `Status: ${episode.status}`;
    card.appendChild(status);

    const rating = createClassAndElement("p", "rating");
    rating.textContent = `Rating: ${episode.rating.average}`;
    card.appendChild(rating);

    const runtime = createClassAndElement("p", "runtime");
    runtime.textContent = `Runtime: ${episode.runtime}`;
    card.appendChild(runtime);
  });
}

async function makePageForShows(episodes) {
  const rootElem = document.getElementById("root");

  episodes.forEach((episode) => {
    const card = createClassAndElement("div", "title-div");
    rootElem.appendChild(card);

    const seasonName = episode.name;
    const seasonNumber = episode.number;
    const convertSeasonNumberToStr = String(seasonNumber).padStart(2, "0");

    const convertSeasonToStr = String(episode.season).padStart(2, "0");
    const episodeCode = `${seasonName} S${convertSeasonToStr}-E${convertSeasonNumberToStr}`;

    const season = createClassAndElement("h1", "title");
    season.textContent = episodeCode;
    card.appendChild(season);

    const imgElement = createClassAndElement("img");
    imgElement.setAttribute("src", episode.image.medium);
    card.appendChild(imgElement);

    const summary = createClassAndElement("h4");
    summary.innerHTML = episode.summary;
    card.appendChild(summary);
  });
}

const footerWrapper = createClassAndElement("div", "footer-wrapper");
document.body.append(footerWrapper);
const footer = createClassAndElement("footer");
footer.innerHTML = `Data originally sourced by <a href="https://tvmaze.com/" target="_blank">TVMaze.com</a>`;
footerWrapper.appendChild(footer);

async function render() {
  const allEpisodes = await fetchShows();
  makePageForEpisodes(allEpisodes);
}

window.onload = render;

// =======
//this is a comment for Karam

window.onload = setup;

// add another comment for karam
