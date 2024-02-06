const headerLayout = document.querySelector(".headerLayout");
const rootDiv = document.getElementById('root');
const episodeSearchField = document.getElementById("episodeSearch");
const episodeDropDown = document.getElementById('episodeSelect');
const forSVG = document.createElement("div");

let defaultOption = document.createElement("option");
defaultOption.setAttribute("value", "default")
defaultOption.textContent = "Please Select...";

forSVG.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 forSVG">
<path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
</svg>`;
headerLayout.insertAdjacentElement("afterbegin", forSVG);
forSVG.addEventListener("click", function () {
  rootDiv.innerHTML = "";
  makePageForEpisodes(getAllEpisodes());
  episodeSearchField.value = "";
  episodeDropDown.value = "default";
})

episodeSearchField.addEventListener("input", searchFilterEpisodes);

// fetching tvmaze api

async function fetchShows() {
  return await fetch("https://api.tvmaze.com/shows")
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching shows:", error));
}

async function testShows() {
  const test = await fetchShows();
  console.log(test);
}

testShows();

async function fetchEpisodes(currentShowsID) {
  try {
    const res = await fetch(
      `https://api.tvmaze.com/shows/${currentShowsID}/episodes`
    );
    if (!res.ok) {
      throw new Error("Could not fetch episodes data");
    } else {
      return res.json();
    }
  } catch (error) {
    console.error(error);
  }
}




// function getAllEpisodes() {
//   return [
//     {
//       id: 4952,
//       url:
//         "http://www.tvmaze.com/episodes/4952/game-of-thrones-1x01-winter-is-coming",
//       name: "Winter is Coming",
//       season: 1,
//       number: 1,
//       airdate: "2011-04-17",
//       airtime: "21:00",
//       airstamp: "2011-04-18T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2668.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2668.jpg",
//       },
//       summary:
//         "<p>Lord Eddard Stark, ruler of the North, is summoned to court by his old friend, King Robert Baratheon, to serve as the King's Hand. Eddard reluctantly agrees after learning of a possible threat to the King's life. Eddard's bastard son Jon Snow must make a painful decision about his own future, while in the distant east Viserys Targaryen plots to reclaim his father's throne, usurped by Robert, by selling his sister in marriage.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4952",
//         },
//       },
//     },
//     {
//       id: 4953,
//       url:
//         "http://www.tvmaze.com/episodes/4953/game-of-thrones-1x02-the-kingsroad",
//       name: "The Kingsroad",
//       season: 1,
//       number: 2,
//       airdate: "2011-04-24",
//       airtime: "21:00",
//       airstamp: "2011-04-25T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2669.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2669.jpg",
//       },
//       summary:
//         "<p>An incident on the Kingsroad threatens Eddard and Robert's friendship. Jon and Tyrion travel to the Wall, where they discover that the reality of the Night's Watch may not match the heroic image of it.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4953",
//         },
//       },
//     },
//     {
//       id: 4954,
//       url: "http://www.tvmaze.com/episodes/4954/game-of-thrones-1x03-lord-snow",
//       name: "Lord Snow",
//       season: 1,
//       number: 3,
//       airdate: "2011-05-01",
//       airtime: "21:00",
//       airstamp: "2011-05-02T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2671.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2671.jpg",
//       },
//       summary:
//         "<p>Jon Snow attempts to find his place amongst the Night's Watch. Eddard and his daughters arrive at King's Landing.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4954",
//         },
//       },
//     },
//     {
//       id: 4955,
//       url:
//         "http://www.tvmaze.com/episodes/4955/game-of-thrones-1x04-cripples-bastards-and-broken-things",
//       name: "Cripples, Bastards, and Broken Things",
//       season: 1,
//       number: 4,
//       airdate: "2011-05-08",
//       airtime: "21:00",
//       airstamp: "2011-05-09T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2673.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2673.jpg",
//       },
//       summary:
//         "<p>Tyrion stops at Winterfell on his way home and gets a frosty reception from Robb Stark. Eddard's investigation into the death of his predecessor gets underway.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4955",
//         },
//       },
//     },
//     {
//       id: 4956,
//       url:
//         "http://www.tvmaze.com/episodes/4956/game-of-thrones-1x05-the-wolf-and-the-lion",
//       name: "The Wolf and the Lion",
//       season: 1,
//       number: 5,
//       airdate: "2011-05-15",
//       airtime: "21:00",
//       airstamp: "2011-05-16T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2674.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2674.jpg",
//       },
//       summary:
//         "<p>Catelyn's actions on the road have repercussions for Eddard. Tyrion enjoys the dubious hospitality of the Eyrie.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4956",
//         },
//       },
//     },
//     {
//       id: 4957,
//       url:
//         "http://www.tvmaze.com/episodes/4957/game-of-thrones-1x06-a-golden-crown",
//       name: "A Golden Crown",
//       season: 1,
//       number: 6,
//       airdate: "2011-05-22",
//       airtime: "21:00",
//       airstamp: "2011-05-23T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2676.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2676.jpg",
//       },
//       summary:
//         "<p>Viserys is increasingly frustrated by the lack of progress towards gaining his crown.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4957",
//         },
//       },
//     },
//     {
//       id: 4958,
//       url:
//         "http://www.tvmaze.com/episodes/4958/game-of-thrones-1x07-you-win-or-you-die",
//       name: "You Win or You Die",
//       season: 1,
//       number: 7,
//       airdate: "2011-05-29",
//       airtime: "21:00",
//       airstamp: "2011-05-30T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2677.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2677.jpg",
//       },
//       summary:
//         "<p>Eddard's investigations in King's Landing reach a climax and a dark secret is revealed.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4958",
//         },
//       },
//     },
//     {
//       id: 4959,
//       url:
//         "http://www.tvmaze.com/episodes/4959/game-of-thrones-1x08-the-pointy-end",
//       name: "The Pointy End",
//       season: 1,
//       number: 8,
//       airdate: "2011-06-05",
//       airtime: "21:00",
//       airstamp: "2011-06-06T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2678.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2678.jpg",
//       },
//       summary:
//         "<p>Tyrion joins his father's army with unexpected allies. Events in King's Landing take a turn for the worse as Arya's lessons are put to the test.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4959",
//         },
//       },
//     },
//     {
//       id: 4960,
//       url: "http://www.tvmaze.com/episodes/4960/game-of-thrones-1x09-baelor",
//       name: "Baelor",
//       season: 1,
//       number: 9,
//       airdate: "2011-06-12",
//       airtime: "21:00",
//       airstamp: "2011-06-13T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2679.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2679.jpg",
//       },
//       summary:
//         "<p>Catelyn must negotiate with the irascible Lord Walder Frey.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4960",
//         },
//       },
//     },
//     {
//       id: 4961,
//       url:
//         "http://www.tvmaze.com/episodes/4961/game-of-thrones-1x10-fire-and-blood",
//       name: "Fire and Blood",
//       season: 1,
//       number: 10,
//       airdate: "2011-06-19",
//       airtime: "21:00",
//       airstamp: "2011-06-20T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2681.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2681.jpg",
//       },
//       summary:
//         "<p>Daenerys must realize her destiny. Jaime finds himself in an unfamiliar predicament.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4961",
//         },
//       },
//     },
//     {
//       id: 4962,
//       url:
//         "http://www.tvmaze.com/episodes/4962/game-of-thrones-2x01-the-north-remembers",
//       name: "The North Remembers",
//       season: 2,
//       number: 1,
//       airdate: "2012-04-01",
//       airtime: "21:00",
//       airstamp: "2012-04-02T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/3174.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/3174.jpg",
//       },
//       summary:
//         "<p>War grips the continent of Westeros. As Tyrion Lannister tries to take his strong-willed nephew in hand in King's Landing, Stannis Baratheon launches his own campaign to take the Iron Throne with the help of a mysterious priestess. In the east, Daenerys must lead her retinue through a desolate wasteland whilst beyond the Wall the Night's Watch seeks the aid of a wildling.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4962",
//         },
//       },
//     },
//     {
//       id: 4963,
//       url:
//         "http://www.tvmaze.com/episodes/4963/game-of-thrones-2x02-the-night-lands",
//       name: "The Night Lands",
//       season: 2,
//       number: 2,
//       airdate: "2012-04-08",
//       airtime: "21:00",
//       airstamp: "2012-04-09T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/3175.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/3175.jpg",
//       },
//       summary:
//         "<p>Stannis uses Ser Davos to seek out new allies for his war with the Lannisters. On the road north, Arya confides in Gendry. Robb Stark sends Theon Greyjoy to win an alliance with his father and the fierce warriors of the Iron Islands. Cersei and Tyrion clash on how to rule in King's Landing.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4963",
//         },
//       },
//     },
//     {
//       id: 4964,
//       url:
//         "http://www.tvmaze.com/episodes/4964/game-of-thrones-2x03-what-is-dead-may-never-die",
//       name: "What is Dead May Never Die",
//       season: 2,
//       number: 3,
//       airdate: "2012-04-15",
//       airtime: "21:00",
//       airstamp: "2012-04-16T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/3176.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/3176.jpg",
//       },
//       summary:
//         "<p>Catelyn Stark treats with King Renly in the hope of winning an alliance. Tyrion undertakes a complex plan in King's Landing to expose an enemy. At Winterfell, Bran's dreams continue to trouble him.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4964",
//         },
//       },
//     },
//     {
//       id: 4965,
//       url:
//         "http://www.tvmaze.com/episodes/4965/game-of-thrones-2x04-garden-of-bones",
//       name: "Garden of Bones",
//       season: 2,
//       number: 4,
//       airdate: "2012-04-22",
//       airtime: "21:00",
//       airstamp: "2012-04-23T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/3177.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/3177.jpg",
//       },
//       summary:
//         "<p>Tyrion attempts to restrain Joffrey's cruelty. Catelyn attempts to broker a peace between Stannis and Renly. Daenerys and her followers arrive at the great city of Qarth and hope to find refuge there. Arya and Gendry arrive at Harrenhal, a great castle now under Lannister occupation.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4965",
//         },
//       },
//     },
//     {
//       id: 4966,
//       url:
//         "http://www.tvmaze.com/episodes/4966/game-of-thrones-2x05-the-ghost-of-harrenhal",
//       name: "The Ghost of Harrenhal",
//       season: 2,
//       number: 5,
//       airdate: "2012-04-29",
//       airtime: "21:00",
//       airstamp: "2012-04-30T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/3178.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/3178.jpg",
//       },
//       summary:
//         "<p>Confusion rages in the Stormlands in the wake of a devastating reversal. Catelyn must flee with a new ally, whilst Littlefinger sees an opportunity in the chaos. Theon seeks to prove himself to his father in battle. Arya receives a promise from the enigmatic Jaqen H'ghar. The Night's Watch arrives at the Fist of the First Men. Daenerys Targaryen receives a marriage proposal.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4966",
//         },
//       },
//     },
//     {
//       id: 4967,
//       url:
//         "http://www.tvmaze.com/episodes/4967/game-of-thrones-2x06-the-old-gods-and-the-new",
//       name: "The Old Gods and the New",
//       season: 2,
//       number: 6,
//       airdate: "2012-05-06",
//       airtime: "21:00",
//       airstamp: "2012-05-07T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/3180.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/3180.jpg",
//       },
//       summary:
//         "<p>Arya has a surprise visitor; Dany vows to take what is hers; Joffrey meets his subjects; Qhorin gives Jon a chance to prove himself.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4967",
//         },
//       },
//     },
//     {
//       id: 4968,
//       url:
//         "http://www.tvmaze.com/episodes/4968/game-of-thrones-2x07-a-man-without-honor",
//       name: "A Man Without Honor",
//       season: 2,
//       number: 7,
//       airdate: "2012-05-13",
//       airtime: "21:00",
//       airstamp: "2012-05-14T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/3192.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/3192.jpg",
//       },
//       summary:
//         "<p>Jaime meets a relative; Theon hunts; Dany receives an invitation.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4968",
//         },
//       },
//     },
//     {
//       id: 4969,
//       url:
//         "http://www.tvmaze.com/episodes/4969/game-of-thrones-2x08-the-prince-of-winterfell",
//       name: "The Prince of Winterfell",
//       season: 2,
//       number: 8,
//       airdate: "2012-05-20",
//       airtime: "21:00",
//       airstamp: "2012-05-21T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/3194.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/3194.jpg",
//       },
//       summary:
//         "<p>Theon holds the fort; Arya calls in her debt with Jaqen; Robb is betrayed; Stannis and Davos approach their destination.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4969",
//         },
//       },
//     },
//     {
//       id: 4970,
//       url:
//         "http://www.tvmaze.com/episodes/4970/game-of-thrones-2x09-blackwater",
//       name: "Blackwater",
//       season: 2,
//       number: 9,
//       airdate: "2012-05-27",
//       airtime: "21:00",
//       airstamp: "2012-05-28T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/3196.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/3196.jpg",
//       },
//       summary:
//         "<p>A massive battle rages for control of King's Landing and the Iron Throne.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4970",
//         },
//       },
//     },
//     {
//       id: 4971,
//       url:
//         "http://www.tvmaze.com/episodes/4971/game-of-thrones-2x10-valar-morghulis",
//       name: "Valar Morghulis",
//       season: 2,
//       number: 10,
//       airdate: "2012-06-03",
//       airtime: "21:00",
//       airstamp: "2012-06-04T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/3197.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/3197.jpg",
//       },
//       summary:
//         "<p>Tyrion awakens to a changed situation. King Joffrey doles out rewards to his subjects. As Theon stirs his men to action, Luwin offers some final advice. Brienne silences Jaime; Arya receives a gift from Jaqen; Dany goes to a strange place; Jon proves himself to Qhorin.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4971",
//         },
//       },
//     },
//     {
//       id: 4972,
//       url:
//         "http://www.tvmaze.com/episodes/4972/game-of-thrones-3x01-valar-dohaeris",
//       name: "Valar Dohaeris",
//       season: 3,
//       number: 1,
//       airdate: "2013-03-31",
//       airtime: "21:00",
//       airstamp: "2013-04-01T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2628.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2628.jpg",
//       },
//       summary:
//         "<p></p><p>Jon is brought before Mance Rayder, the King Beyond the Wall, while the Night's Watch survivors retreat south. In King's Landing, Tyrion asks for his reward. Littlefinger offers Sansa a way out. Cersei hosts a dinner for the royal family. Daenerys sails into Slaver's Bay.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4972",
//         },
//       },
//     },
//     {
//       id: 4973,
//       url:
//         "http://www.tvmaze.com/episodes/4973/game-of-thrones-3x02-dark-wings-dark-words",
//       name: "Dark Wings, Dark Words",
//       season: 3,
//       number: 2,
//       airdate: "2013-04-07",
//       airtime: "21:00",
//       airstamp: "2013-04-08T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2618.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2618.jpg",
//       },
//       summary:
//         "<p>Sansa says too much. Shae asks Tyrion for a favor. Jaime finds a way to pass the time. Arya runs into the Brotherhood Without Banners.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4973",
//         },
//       },
//     },
//     {
//       id: 4974,
//       url:
//         "http://www.tvmaze.com/episodes/4974/game-of-thrones-3x03-walk-of-punishment",
//       name: "Walk of Punishment",
//       season: 3,
//       number: 3,
//       airdate: "2013-04-14",
//       airtime: "21:00",
//       airstamp: "2013-04-15T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2616.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2616.jpg",
//       },
//       summary:
//         "<p>Tyrion shoulders new responsibilities. Jon is taken to the Fist of the First Men. Daenerys meets with the slavers. Jaime strikes a deal with his captors.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4974",
//         },
//       },
//     },
//     {
//       id: 4975,
//       url:
//         "http://www.tvmaze.com/episodes/4975/game-of-thrones-3x04-and-now-his-watch-is-ended",
//       name: "And Now His Watch is Ended",
//       season: 3,
//       number: 4,
//       airdate: "2013-04-21",
//       airtime: "21:00",
//       airstamp: "2013-04-22T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2615.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2615.jpg",
//       },
//       summary:
//         "<p>The Night's Watch takes stock. Varys meets his better. Arya is taken to the commander of the Brotherhood. Daenerys exchanges a chain for a Whip.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4975",
//         },
//       },
//     },
//     {
//       id: 4976,
//       url:
//         "http://www.tvmaze.com/episodes/4976/game-of-thrones-3x05-kissed-by-fire",
//       name: "Kissed by Fire",
//       season: 3,
//       number: 5,
//       airdate: "2013-04-28",
//       airtime: "21:00",
//       airstamp: "2013-04-29T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2614.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2614.jpg",
//       },
//       summary:
//         "<p>The Hound is judged by the gods; Jaime is judged by men. Jon proves himself; Robb is betrayed. Tyrion learns the cost of weddings.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4976",
//         },
//       },
//     },
//     {
//       id: 4977,
//       url: "http://www.tvmaze.com/episodes/4977/game-of-thrones-3x06-the-climb",
//       name: "The Climb",
//       season: 3,
//       number: 6,
//       airdate: "2013-05-05",
//       airtime: "21:00",
//       airstamp: "2013-05-06T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2612.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2612.jpg",
//       },
//       summary:
//         "<p>Tywin plans strategic unions for the Lannisters. Melisandre visits the Riverlands. Robb weighs a compromise to repair his alliance with House Frey. Roose Bolton decides what to do with Jaime Lannister. Jon, Ygritte and the Wildlings face a daunting climb.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4977",
//         },
//       },
//     },
//     {
//       id: 4978,
//       url:
//         "http://www.tvmaze.com/episodes/4978/game-of-thrones-3x07-the-bear-and-the-maiden-fair",
//       name: "The Bear and the Maiden Fair",
//       season: 3,
//       number: 7,
//       airdate: "2013-05-12",
//       airtime: "21:00",
//       airstamp: "2013-05-13T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2611.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2611.jpg",
//       },
//       summary:
//         "<p>Daenerys exchanges gifts with a slave lord outside Yunkai. As Sansa frets about her prospects, Shae chafes at Tyrion's new situation. Tywin counsels the king, and Melisandre reveals a secret to Gendry. Brienne faces a formidable foe in Harrenhal.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4978",
//         },
//       },
//     },
//     {
//       id: 4979,
//       url:
//         "http://www.tvmaze.com/episodes/4979/game-of-thrones-3x08-second-sons",
//       name: "Second Sons",
//       season: 3,
//       number: 8,
//       airdate: "2013-05-19",
//       airtime: "21:00",
//       airstamp: "2013-05-20T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2599.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2599.jpg",
//       },
//       summary:
//         "<p>King's Landing hosts a wedding, and Tyrion and Sansa spend the night together. Daenerys meets the Titan's Bastard. Davos demands proof from Melisandre. Sam and Gilly meet an older Gentleman.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4979",
//         },
//       },
//     },
//     {
//       id: 4980,
//       url:
//         "http://www.tvmaze.com/episodes/4980/game-of-thrones-3x09-the-rains-of-castamere",
//       name: "The Rains of Castamere",
//       season: 3,
//       number: 9,
//       airdate: "2013-06-02",
//       airtime: "21:00",
//       airstamp: "2013-06-03T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2598.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2598.jpg",
//       },
//       summary:
//         "<p>Robb presents himself to Walder Frey, and Edmure meets his bride. Jon faces his harshest test yet. Bran discovers a new gift. Daario and Jorah debate how to take Yunkai. House Frey joins with House Tully.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4980",
//         },
//       },
//     },
//     {
//       id: 4981,
//       url: "http://www.tvmaze.com/episodes/4981/game-of-thrones-3x10-mhysa",
//       name: "Mhysa",
//       season: 3,
//       number: 10,
//       airdate: "2013-06-09",
//       airtime: "21:00",
//       airstamp: "2013-06-10T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2597.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2597.jpg",
//       },
//       summary:
//         "<p>Joffrey challenges Tywin. Bran tells a ghost story. In Dragonstone, mercy comes from strange quarters. Daenerys waits to see if she is a conqueror or a liberator.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4981",
//         },
//       },
//     },
//     {
//       id: 4982,
//       url:
//         "http://www.tvmaze.com/episodes/4982/game-of-thrones-4x01-two-swords",
//       name: "Two Swords",
//       season: 4,
//       number: 1,
//       airdate: "2014-04-06",
//       airtime: "21:00",
//       airstamp: "2014-04-07T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2583.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2583.jpg",
//       },
//       summary:
//         "<p>Tyrion welcomes a guest to King's Landing. At Castle Black, Jon Snow finds himself unwelcome. Dany is pointed to Meereen, the mother of all slave cities. Arya runs into an old friend.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4982",
//         },
//       },
//     },
//     {
//       id: 4983,
//       url:
//         "http://www.tvmaze.com/episodes/4983/game-of-thrones-4x02-the-lion-and-the-rose",
//       name: "The Lion and the Rose",
//       season: 4,
//       number: 2,
//       airdate: "2014-04-13",
//       airtime: "21:00",
//       airstamp: "2014-04-14T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2584.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2584.jpg",
//       },
//       summary:
//         "<p>Tyrion lends Jaime a hand. Joffrey and Margaery host a breakfast. At Dragonstone, Stannis loses patience with Davos. Ramsay finds a purpose for his pet. North of the Wall, Bran sees where they must go.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4983",
//         },
//       },
//     },
//     {
//       id: 4984,
//       url:
//         "http://www.tvmaze.com/episodes/4984/game-of-thrones-4x03-breaker-of-chains",
//       name: "Breaker of Chains",
//       season: 4,
//       number: 3,
//       airdate: "2014-04-20",
//       airtime: "21:00",
//       airstamp: "2014-04-21T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2585.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2585.jpg",
//       },
//       summary:
//         "<p>Tyrion ponders his options. Tywin extends an olive branch. Sam realizes Castle Black isn't safe, and Jon proposes a bold plan. The Hound teaches Arya the way things are. Dany chooses her Champion.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4984",
//         },
//       },
//     },
//     {
//       id: 4985,
//       url:
//         "http://www.tvmaze.com/episodes/4985/game-of-thrones-4x04-oathkeeper",
//       name: "Oathkeeper",
//       season: 4,
//       number: 4,
//       airdate: "2014-04-27",
//       airtime: "21:00",
//       airstamp: "2014-04-28T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2586.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2586.jpg",
//       },
//       summary:
//         "<p>Dany balances justice and mercy. Jaime tasks Brienne with his honor. Jon secures volunteers while Bran, Jojen, Meera and Hodor stumble on shelter.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4985",
//         },
//       },
//     },
//     {
//       id: 4986,
//       url:
//         "http://www.tvmaze.com/episodes/4986/game-of-thrones-4x05-first-of-his-name",
//       name: "First of His Name",
//       season: 4,
//       number: 5,
//       airdate: "2014-05-04",
//       airtime: "21:00",
//       airstamp: "2014-05-05T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2587.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2587.jpg",
//       },
//       summary:
//         "<p>Cersei and Tywin plot the Crown's next move. Dany discusses future plans. Jon embarks on a new mission.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4986",
//         },
//       },
//     },
//     {
//       id: 4987,
//       url:
//         "http://www.tvmaze.com/episodes/4987/game-of-thrones-4x06-the-laws-of-gods-and-men",
//       name: "The Laws of Gods and Men",
//       season: 4,
//       number: 6,
//       airdate: "2014-05-11",
//       airtime: "21:00",
//       airstamp: "2014-05-12T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2588.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2588.jpg",
//       },
//       summary:
//         "<p>Stannis and Davos set sail with a new strategy. Dany meets with supplicants. Tyrion faces down his father in the throne room.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4987",
//         },
//       },
//     },
//     {
//       id: 4988,
//       url:
//         "http://www.tvmaze.com/episodes/4988/game-of-thrones-4x07-mockingbird",
//       name: "Mockingbird",
//       season: 4,
//       number: 7,
//       airdate: "2014-05-18",
//       airtime: "21:00",
//       airstamp: "2014-05-19T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2589.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2589.jpg",
//       },
//       summary:
//         "<p>Tyrion enlists an unlikely ally. Daario entreats Dany to allow him to do what he does best. Jon's warnings about the Wall's vulnerability fall on deaf ears. Brienne follows a new lead on the road with Pod.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4988",
//         },
//       },
//     },
//     {
//       id: 4989,
//       url:
//         "http://www.tvmaze.com/episodes/4989/game-of-thrones-4x08-the-mountain-and-the-viper",
//       name: "The Mountain and the Viper",
//       season: 4,
//       number: 8,
//       airdate: "2014-06-01",
//       airtime: "21:00",
//       airstamp: "2014-06-02T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2591.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2591.jpg",
//       },
//       summary:
//         "<p>Mole's Town receives unexpected visitors. Littlefinger's motives are questioned. Ramsay attempts to prove himself to his father. Tyrion's fate is decided.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4989",
//         },
//       },
//     },
//     {
//       id: 4990,
//       url:
//         "http://www.tvmaze.com/episodes/4990/game-of-thrones-4x09-the-watchers-on-the-wall",
//       name: "The Watchers on the Wall",
//       season: 4,
//       number: 9,
//       airdate: "2014-06-08",
//       airtime: "21:00",
//       airstamp: "2014-06-09T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2593.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2593.jpg",
//       },
//       summary:
//         "<p>Jon Snow and the rest of the Night's Watch face the biggest challenge to the Wall yet.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4990",
//         },
//       },
//     },
//     {
//       id: 4991,
//       url:
//         "http://www.tvmaze.com/episodes/4991/game-of-thrones-4x10-the-children",
//       name: "The Children",
//       season: 4,
//       number: 10,
//       airdate: "2014-06-15",
//       airtime: "21:00",
//       airstamp: "2014-06-16T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/1/2594.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/1/2594.jpg",
//       },
//       summary:
//         "<p>An unexpected arrival north of the Wall changes circumstances. Dany is forced to face harsh realities. Bran learns more of his destiny. Tyrion sees the truth of his situation.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/4991",
//         },
//       },
//     },
//     {
//       id: 116522,
//       url:
//         "http://www.tvmaze.com/episodes/116522/game-of-thrones-5x01-the-wars-to-come",
//       name: "The Wars to Come",
//       season: 5,
//       number: 1,
//       airdate: "2015-04-12",
//       airtime: "21:00",
//       airstamp: "2015-04-13T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/10/25988.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/10/25988.jpg",
//       },
//       summary:
//         "<p>Varys discusses a conspiracy with Tyrion; Daenerys' rule faces a new threat; Jon finds himself between two kings; and Cersei and Jaime try to move on from Tywin's demise.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/116522",
//         },
//       },
//     },
//     {
//       id: 144328,
//       url:
//         "http://www.tvmaze.com/episodes/144328/game-of-thrones-5x02-the-house-of-black-and-white",
//       name: "The House of Black and White",
//       season: 5,
//       number: 2,
//       airdate: "2015-04-19",
//       airtime: "21:00",
//       airstamp: "2015-04-20T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/10/25989.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/10/25989.jpg",
//       },
//       summary:
//         "<p>Arya arrives in Braavos; Brienne and Podrick find danger while traveling; Cersei worries about Myrcella in Dorne when Ellaria Sand seeks revenge for Oberyn's death; Jon is tempted by Stannis.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/144328",
//         },
//       },
//     },
//     {
//       id: 144329,
//       url:
//         "http://www.tvmaze.com/episodes/144329/game-of-thrones-5x03-high-sparrow",
//       name: "High Sparrow",
//       season: 5,
//       number: 3,
//       airdate: "2015-04-26",
//       airtime: "21:00",
//       airstamp: "2015-04-27T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/10/25990.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/10/25990.jpg",
//       },
//       summary:
//         "<p>Cersei meets the High Sparrow after learning of a clergyman's embarrassing tale. Meanwhile, Davos talks to Jon about the future of Winterfell, where Ramsay Snow has just learned the identity of his future bride; Arya grows impatient doing menial tasks in the House of Black and White; and Tyrion searches for more comfortable surroundings on a long trip with Varys.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/144329",
//         },
//       },
//     },
//     {
//       id: 144330,
//       url:
//         "http://www.tvmaze.com/episodes/144330/game-of-thrones-5x04-sons-of-the-harpy",
//       name: "Sons of the Harpy",
//       season: 5,
//       number: 4,
//       airdate: "2015-05-03",
//       airtime: "21:00",
//       airstamp: "2015-05-04T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/10/26444.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/10/26444.jpg",
//       },
//       summary:
//         "<p>Margaery seeks prudent counsel. Jaime Struggles in foreign lands. Dany answers the Harpy's call.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/144330",
//         },
//       },
//     },
//     {
//       id: 151777,
//       url:
//         "http://www.tvmaze.com/episodes/151777/game-of-thrones-5x05-kill-the-boy",
//       name: "Kill the Boy",
//       season: 5,
//       number: 5,
//       airdate: "2015-05-10",
//       airtime: "21:00",
//       airstamp: "2015-05-11T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/10/26819.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/10/26819.jpg",
//       },
//       summary:
//         "<p>Dany makes a difficult decision in Meereen. Jon recruits the help of an unexpected ally. Brienne searches for Sansa. Theon remains under Ramsay's control.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/151777",
//         },
//       },
//     },
//     {
//       id: 152766,
//       url:
//         "http://www.tvmaze.com/episodes/152766/game-of-thrones-5x06-unbowed-unbent-unbroken",
//       name: "Unbowed, Unbent, Unbroken",
//       season: 5,
//       number: 6,
//       airdate: "2015-05-17",
//       airtime: "21:00",
//       airstamp: "2015-05-18T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/10/27259.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/10/27259.jpg",
//       },
//       summary:
//         "<p>Arya trains. Jorah and Tyrion run into slavers. Trystane and Myrcella make plans. Jaime and Bronn reach their destination. The Sand Snakes attack.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/152766",
//         },
//       },
//     },
//     {
//       id: 153327,
//       url:
//         "http://www.tvmaze.com/episodes/153327/game-of-thrones-5x07-the-gift",
//       name: "The Gift",
//       season: 5,
//       number: 7,
//       airdate: "2015-05-24",
//       airtime: "21:00",
//       airstamp: "2015-05-25T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/11/27535.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/11/27535.jpg",
//       },
//       summary:
//         "<p>Jon prepares for conflict. Sansa tries to talk to Theon. Brienne waits for a sign. Stannis remains stubborn. Jaime attempts to reconnect with family.</p><p><br><br></p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/153327",
//         },
//       },
//     },
//     {
//       id: 155299,
//       url:
//         "http://www.tvmaze.com/episodes/155299/game-of-thrones-5x08-hardhome",
//       name: "Hardhome",
//       season: 5,
//       number: 8,
//       airdate: "2015-05-31",
//       airtime: "21:00",
//       airstamp: "2015-06-01T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/11/28151.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/11/28151.jpg",
//       },
//       summary:
//         "<p>Arya makes progress in her training. Sansa confronts an old friend. Cersei struggles. Jon travels.</p><p><br><br></p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/155299",
//         },
//       },
//     },
//     {
//       id: 160040,
//       url:
//         "http://www.tvmaze.com/episodes/160040/game-of-thrones-5x09-the-dance-of-dragons",
//       name: "The Dance of Dragons",
//       season: 5,
//       number: 9,
//       airdate: "2015-06-07",
//       airtime: "21:00",
//       airstamp: "2015-06-08T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/11/29160.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/11/29160.jpg",
//       },
//       summary:
//         "<p>Stannis confronts a troubling decision. Jon returns to The Wall. Mace visits the Iron Bank. Arya encounters someone from her past. Dany reluctantly oversees a traditional celebration of athleticism.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/160040",
//         },
//       },
//     },
//     {
//       id: 162186,
//       url:
//         "http://www.tvmaze.com/episodes/162186/game-of-thrones-5x10-mothers-mercy",
//       name: "Mother's Mercy",
//       season: 5,
//       number: 10,
//       airdate: "2015-06-14",
//       airtime: "21:00",
//       airstamp: "2015-06-15T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/12/30012.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/12/30012.jpg",
//       },
//       summary:
//         "<p>Cersei seeks forgiveness; Jon faces a new challenge; Arya plots to cross a name off her list; Tyrion sees a familiar face; and Daenerys finds herself surrounded by strangers.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/162186",
//         },
//       },
//     },
//     {
//       id: 560813,
//       url:
//         "http://www.tvmaze.com/episodes/560813/game-of-thrones-6x01-the-red-woman",
//       name: "The Red Woman",
//       season: 6,
//       number: 1,
//       airdate: "2016-04-24",
//       airtime: "21:00",
//       airstamp: "2016-04-25T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/56/142371.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/56/142371.jpg",
//       },
//       summary:
//         "<p>Jon Snow is dead. Daenerys meets a strong man. Cersei sees her daughter again.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/560813",
//         },
//       },
//     },
//     {
//       id: 664672,
//       url: "http://www.tvmaze.com/episodes/664672/game-of-thrones-6x02-home",
//       name: "Home",
//       season: 6,
//       number: 2,
//       airdate: "2016-05-01",
//       airtime: "21:00",
//       airstamp: "2016-05-02T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/56/142372.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/56/142372.jpg",
//       },
//       summary:
//         "<p>Bran trains with the Three-Eyed Raven. In King's Landing, Jaime advises Tommen. Tyrion demands good news, but has to make his own. At Castle Black, the Night's Watch stands behind Thorne. Ramsay Bolton proposes a plan, and Balon Greyjoy entertains other proposals.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/664672",
//         },
//       },
//     },
//     {
//       id: 664673,
//       url:
//         "http://www.tvmaze.com/episodes/664673/game-of-thrones-6x03-oathbreaker",
//       name: "Oathbreaker",
//       season: 6,
//       number: 3,
//       airdate: "2016-05-08",
//       airtime: "21:00",
//       airstamp: "2016-05-09T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/56/142370.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/56/142370.jpg",
//       },
//       summary:
//         "<p>Daenerys meets her future. Bran meets the past. Tommen confronts the High Sparrow. Arya trains to be No One. Varys finds an answer. Ramsay gets a gift.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/664673",
//         },
//       },
//     },
//     {
//       id: 664674,
//       url:
//         "http://www.tvmaze.com/episodes/664674/game-of-thrones-6x04-book-of-the-stranger",
//       name: "Book of the Stranger",
//       season: 6,
//       number: 4,
//       airdate: "2016-05-15",
//       airtime: "21:00",
//       airstamp: "2016-05-16T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/56/142273.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/56/142273.jpg",
//       },
//       summary:
//         "<p>Tyrion strikes a deal. Jorah and Daario undertake a difficult task. Jaime and Cersei try to improve their situation.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/664674",
//         },
//       },
//     },
//     {
//       id: 664675,
//       url:
//         "http://www.tvmaze.com/episodes/664675/game-of-thrones-6x05-the-door",
//       name: "The Door",
//       season: 6,
//       number: 5,
//       airdate: "2016-05-22",
//       airtime: "21:00",
//       airstamp: "2016-05-23T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/60/150273.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/60/150273.jpg",
//       },
//       summary:
//         "<p>Tyrion seeks a strange ally. Bran learns a great deal. Brienne goes on a mission. Arya is given a chance to prove herself.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/664675",
//         },
//       },
//     },
//     {
//       id: 664676,
//       url:
//         "http://www.tvmaze.com/episodes/664676/game-of-thrones-6x06-blood-of-my-blood",
//       name: "Blood of My Blood",
//       season: 6,
//       number: 6,
//       airdate: "2016-05-29",
//       airtime: "21:00",
//       airstamp: "2016-05-30T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/60/150274.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/60/150274.jpg",
//       },
//       summary:
//         "<p>An old foe comes back into the picture. Gilly meets Sam's family. Arya faces a difficult choice. Jaime faces off against the High Sparrow.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/664676",
//         },
//       },
//     },
//     {
//       id: 717449,
//       url:
//         "http://www.tvmaze.com/episodes/717449/game-of-thrones-6x07-the-broken-man",
//       name: "The Broken Man",
//       season: 6,
//       number: 7,
//       airdate: "2016-06-05",
//       airtime: "21:00",
//       airstamp: "2016-06-06T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/60/150275.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/60/150275.jpg",
//       },
//       summary:
//         "<p>The High Sparrow eyes another target. Jaime confronts a hero. Arya makes a plan. The North is reminded.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/717449",
//         },
//       },
//     },
//     {
//       id: 729573,
//       url: "http://www.tvmaze.com/episodes/729573/game-of-thrones-6x08-no-one",
//       name: "No One",
//       season: 6,
//       number: 8,
//       airdate: "2016-06-12",
//       airtime: "21:00",
//       airstamp: "2016-06-13T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/61/153044.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/61/153044.jpg",
//       },
//       summary:
//         "<p>Jaime encounters a hero; the High Sparrow fixates on another prey; Arya hatches a new plan; Yara and Theon plot their next move; Olenna and Cersei discuss their families' futures.</p><p></p><p>While Jaime weighs his options, Cersei answers a request. Tyrion's plans bear fruit. Arya faces a new test.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/729573",
//         },
//       },
//     },
//     {
//       id: 729574,
//       url:
//         "http://www.tvmaze.com/episodes/729574/game-of-thrones-6x09-battle-of-the-bastards",
//       name: "Battle of the Bastards",
//       season: 6,
//       number: 9,
//       airdate: "2016-06-19",
//       airtime: "21:00",
//       airstamp: "2016-06-20T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/62/155042.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/62/155042.jpg",
//       },
//       summary:
//         "<p>Ramsay surprises his audience. Jon retaliates. Dany is true to her word.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/729574",
//         },
//       },
//     },
//     {
//       id: 729575,
//       url:
//         "http://www.tvmaze.com/episodes/729575/game-of-thrones-6x10-the-winds-of-winter",
//       name: "The Winds of Winter",
//       season: 6,
//       number: 10,
//       airdate: "2016-06-26",
//       airtime: "21:00",
//       airstamp: "2016-06-27T01:00:00+00:00",
//       runtime: 69,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/63/157920.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/63/157920.jpg",
//       },
//       summary:
//         "<p>Alliances are made, the High Sparrow is holding trials at King's Landing, Daenerys is sailing for the Seven Kingdoms and a new King of the North is crowned.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/729575",
//         },
//       },
//     },
//     {
//       id: 937256,
//       url:
//         "http://www.tvmaze.com/episodes/937256/game-of-thrones-7x01-dragonstone",
//       name: "Dragonstone",
//       season: 7,
//       number: 1,
//       airdate: "2017-07-16",
//       airtime: "21:00",
//       airstamp: "2017-07-17T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/120/302038.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/120/302038.jpg",
//       },
//       summary:
//         "<p>Jon organizes the defense of the North. Cersei tries to even the odds. Daenerys comes home.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/937256",
//         },
//       },
//     },
//     {
//       id: 1221410,
//       url:
//         "http://www.tvmaze.com/episodes/1221410/game-of-thrones-7x02-stormborn",
//       name: "Stormborn",
//       season: 7,
//       number: 2,
//       airdate: "2017-07-23",
//       airtime: "21:00",
//       airstamp: "2017-07-24T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/120/302047.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/120/302047.jpg",
//       },
//       summary:
//         "<p>Daenerys receives an unexpected visitor. Jon faces a revolt. Tyrion plans the conquest of Westeros.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/1221410",
//         },
//       },
//     },
//     {
//       id: 1221411,
//       url:
//         "http://www.tvmaze.com/episodes/1221411/game-of-thrones-7x03-the-queens-justice",
//       name: "The Queen's Justice",
//       season: 7,
//       number: 3,
//       airdate: "2017-07-30",
//       airtime: "21:00",
//       airstamp: "2017-07-31T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/122/306938.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/122/306938.jpg",
//       },
//       summary:
//         "<p>Daenerys holds court. Cersei returns a gift. Jaime learns from his mistakes.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/1221411",
//         },
//       },
//     },
//     {
//       id: 1221412,
//       url:
//         "http://www.tvmaze.com/episodes/1221412/game-of-thrones-7x04-the-spoils-of-war",
//       name: "The Spoils of War",
//       season: 7,
//       number: 4,
//       airdate: "2017-08-06",
//       airtime: "21:00",
//       airstamp: "2017-08-07T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/123/307677.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/123/307677.jpg",
//       },
//       summary:
//         "<p>Arya gets to the final destination. Daenerys takes it upon herself to strike back.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/1221412",
//         },
//       },
//     },
//     {
//       id: 1221413,
//       url:
//         "http://www.tvmaze.com/episodes/1221413/game-of-thrones-7x05-eastwatch",
//       name: "Eastwatch",
//       season: 7,
//       number: 5,
//       airdate: "2017-08-13",
//       airtime: "21:00",
//       airstamp: "2017-08-14T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/124/310839.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/124/310839.jpg",
//       },
//       summary:
//         "<p>Daenerys demands loyalty from the surviving Lannister soldiers; Jon heeds Bran's warning about White Walkers on the move; Cersei vows to vanquish anyone or anything that stands in her way.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/1221413",
//         },
//       },
//     },
//     {
//       id: 1221414,
//       url:
//         "http://www.tvmaze.com/episodes/1221414/game-of-thrones-7x06-beyond-the-wall",
//       name: "Beyond the Wall",
//       season: 7,
//       number: 6,
//       airdate: "2017-08-20",
//       airtime: "21:00",
//       airstamp: "2017-08-21T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/125/312651.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/125/312651.jpg",
//       },
//       summary:
//         "<p>Jon's mission continues north of the wall, but the odds against his ragged band of misfits may be greater than he imagined.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/1221414",
//         },
//       },
//     },
//     {
//       id: 1221415,
//       url:
//         "http://www.tvmaze.com/episodes/1221415/game-of-thrones-7x07-the-dragon-and-the-wolf",
//       name: "The Dragon and the Wolf",
//       season: 7,
//       number: 7,
//       airdate: "2017-08-27",
//       airtime: "21:00",
//       airstamp: "2017-08-28T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/125/314502.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/125/314502.jpg",
//       },
//       summary:
//         "<p>Cersei sits on the Iron Throne; Daenerys sails across the Narrow Sea; Jon Snow is King in the North, and winter is finally here.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/1221415",
//         },
//       },
//     },
//     {
//       id: 1590943,
//       url:
//         "http://www.tvmaze.com/episodes/1590943/game-of-thrones-8x01-winterfell",
//       name: "Winterfell",
//       season: 8,
//       number: 1,
//       airdate: "2019-04-14",
//       airtime: "21:00",
//       airstamp: "2019-04-15T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/191/479477.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/191/479477.jpg",
//       },
//       summary:
//         "<p>Arriving at Winterfell, Jon and Daenerys struggle to unite a divided North. Jon gets some big news.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/1590943",
//         },
//       },
//     },
//     {
//       id: 1623964,
//       url:
//         "http://www.tvmaze.com/episodes/1623964/game-of-thrones-8x02-a-knight-of-the-seven-kingdoms",
//       name: "A Knight of the Seven Kingdoms",
//       season: 8,
//       number: 2,
//       airdate: "2019-04-21",
//       airtime: "21:00",
//       airstamp: "2019-04-22T01:00:00+00:00",
//       runtime: 60,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/192/482451.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/192/482451.jpg",
//       },
//       summary:
//         "<p>Jaime faces judgement and Winterfell prepares for the battle to come.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/1623964",
//         },
//       },
//     },
//     {
//       id: 1623965,
//       url:
//         "http://www.tvmaze.com/episodes/1623965/game-of-thrones-8x03-the-long-night",
//       name: "The Long Night",
//       season: 8,
//       number: 3,
//       airdate: "2019-04-28",
//       airtime: "21:00",
//       airstamp: "2019-04-29T01:00:00+00:00",
//       runtime: 90,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/192/482465.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/192/482465.jpg",
//       },
//       summary: "<p>Winterfell fights the Army of the Dead.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/1623965",
//         },
//       },
//     },
//     {
//       id: 1623966,
//       url:
//         "http://www.tvmaze.com/episodes/1623966/game-of-thrones-8x04-the-last-of-the-starks",
//       name: "The Last of the Starks",
//       season: 8,
//       number: 4,
//       airdate: "2019-05-05",
//       airtime: "21:00",
//       airstamp: "2019-05-06T01:00:00+00:00",
//       runtime: 78,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/195/487839.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/195/487839.jpg",
//       },
//       summary:
//         "<p>The survivors plan their next steps; Cersei makes a power move.</p><p></p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/1623966",
//         },
//       },
//     },
//     {
//       id: 1623967,
//       url:
//         "http://www.tvmaze.com/episodes/1623967/game-of-thrones-8x05-the-bells",
//       name: "The Bells",
//       season: 8,
//       number: 5,
//       airdate: "2019-05-12",
//       airtime: "21:00",
//       airstamp: "2019-05-13T01:00:00+00:00",
//       runtime: 79,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/196/491994.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/196/491994.jpg",
//       },
//       summary:
//         "<p>Varys betrays his queen, and Daenerys brings her forces to King's Landing.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/1623967",
//         },
//       },
//     },
//     {
//       id: 1623968,
//       url:
//         "http://www.tvmaze.com/episodes/1623968/game-of-thrones-8x06-the-iron-throne",
//       name: "The Iron Throne",
//       season: 8,
//       number: 6,
//       airdate: "2019-05-19",
//       airtime: "21:00",
//       airstamp: "2019-05-20T01:00:00+00:00",
//       runtime: 80,
//       image: {
//         medium:
//           "http://static.tvmaze.com/uploads/images/medium_landscape/198/495648.jpg",
//         original:
//           "http://static.tvmaze.com/uploads/images/original_untouched/198/495648.jpg",
//       },
//       summary:
//         "<p>In the aftermath of the devastating attack on King's Landing, Daenerys must face the survivors.</p>",
//       _links: {
//         self: {
//           href: "http://api.tvmaze.com/episodes/1623968",
//         },
//       },
//     },
//   ];
// }

function searchFilterEpisodes() {
  // Gets value from keyboard input and turns into lowercase
  const keyboardInput = episodeSearchField.value.toLowerCase();
  // Filters through the episodes to find the ones that match the searchfield
  const filterEpisodes = getAllEpisodes().filter((episode) => episode.name.toLowerCase().includes(keyboardInput) || episode.summary.toLowerCase().includes(keyboardInput));
  // Clears all the existing cards
  rootDiv.innerHTML = "";
  // Creates new cards based upon the filtered episodes
  makePageForEpisodes(filterEpisodes);

  // Resets the dropdown menu to default 
  episodeDropDown.value = "default";
}

function dropDownFilter() {
  episodeDropDown.appendChild(defaultOption)

  getAllEpisodes().forEach((episode) => {
    const options = document.createElement("option");
    options.textContent = episode.name;
    episodeDropDown.appendChild(options);
  })
  episodeDropDown.addEventListener("input", function (clickEpisode) {
    const selectedEpisode = getAllEpisodes().filter((episode) => episode.name === clickEpisode.target.value);
    rootDiv.innerHTML = "";
    makePageForEpisodes(selectedEpisode);
    episodeSearchField.value = "";

    if (clickEpisode.target.value === defaultOption.value) {
      rootDiv.innerHTML = "";
      makePageForEpisodes(getAllEpisodes());
    }
  })
}

dropDownFilter();


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
  })
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
