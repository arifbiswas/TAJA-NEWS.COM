const loadCategory = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const respons = await fetch(url);
  const data = await respons.json();
  return data.data.news_category;
};

const categoryDisplay = async () => {
  const categorys = await loadCategory();
  // console.log(category);

  const categoryContainer = document.getElementById("category-container");
  categoryContainer.textContent = "";

  categorys.forEach((category) => {
    const { category_id, category_name } = category;
    // console.log(category_id,category_name);

    const childDiv = document.createElement("div");
    childDiv.classList.add("category");
    childDiv.innerHTML = `
        <button onclick="showNewsByCategory('${category_id}')">${category_name}</button>
        `;
    categoryContainer.appendChild(childDiv);
  });
};
categoryDisplay();

const showNewsByCategory = async (id) => {
  // console.log(id);

  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const respons = await fetch(url);
  const data = await respons.json();
  // console.log(data.data);
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  const loadnews = data.data;

  // console.log(news);
  loadnews.forEach((news) => {
    const {
      author,
      details,
      image_url,
      others_info,
      thumbnail_url,
      title,
      total_view,
      _id,
    } = news;
    const { name, img, published_date } = author;
    // console.log(author);
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("card", "card-side", "bg-base-100");
    newsDiv.innerHTML = `
        <figure>
            <img class="h-96 w-80" src="${image_url}" alt="Movie" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p class="text-zinc-600">${details.slice(0, 600) + "..."}</p>
            <div class="card-actions justify-between items-center">
                <div class="flex ">
                    <div class="avatar online mr-4">
                        <div class="w-12 rounded-full">
                            <img src="${img}" />
                        </div>
                        </div>
                        
                        <div>
                            <h4>${name}</h4>
                            <p class="text-sm">${published_date.slice(
                              0,
                              11
                            )}</p>
                        </div>
                        
                    </div>
                    <div >
                         <p class="text-gray-600">View ${total_view}</p>
                        </div>
                         <button class="btn bg-white text-gray-500 hover:bg-white border-sky-400 hover:text-sky-400">></button>
                    </div>
                    
                </div>
          </div>
        `;
    newsContainer.appendChild(newsDiv);
  });
};

// (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// 0:
// author: {name: 'Jimmy Dane', published_date: '2022-08-24 17:27:34', img: 'https://images.unsplash.com/photo-1633332755192-72…HxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'}
// category_id: "01"
// details: "Wednesday, August 24, 2022 | Tag Cloud Tags: Biden, EU, Euro, Europe, Joe Biden, Military, News, Russia, Security, UK, Ukraine, United States, Worthy News (Worthy News) – U.S. President Joe Biden has announced nearly $3 billion in new U.S. military aid for Kyiv as Ukraine marked its independence day six months after Russia invaded the country.'The United States of America is committed to supporting the people of Ukraine as they continue the fight to defend their sovereignty. As part of that commitment, I am proud to announce our biggest tranche of security assistance to date: approximately $2."
// image_url: "https://i.ibb.co/M23fhxm/unsplash-Eh-Tc-C9s-YXsw.png"
// others_info: {is_todays_pick: false, is_trending: true}
// rating: {number: 4.5, badge: 'Excellent'}
// thumbnail_url: "https://i.ibb.co/QnwC4sG/unsplash-Eh-Tc-C9s-YXsw-11.png"
// title: "Biden Pledges Nearly $3 Billion To Ukraine In Largest U.S. Military Aid Package Yet"
// total_view: 488
// _id: "0282e0e58a5c404fbd15261f11c2ab6a"
// [[Prototype]]: Object
// 1: {_id: 'f69a695f037cd9484cecaea37ca71011', others_info: {…}, category_id: '01', rating: {…}, total_view: 400, …}
// 2: {_id: '11468ed61aee84de492a8b04158a22f0', others_info: {…}, category_id: '01', rating: {…}, total_view: 980, …}
// 3: {_id: '7c4dfea0fafddc813673282a428429b7', others_info: {…}, category_id: '01', rating: {…}, total_view: 0, …}
// 4: {_id: '30af81e91ab3eafc0bcae0de62f55d5c', others_info: {…}, category_id: '01', rating: {…}, total_view: 320, …}
// 5: {_id: '919db97c34e0778b387dd40cdfa08130', others_info: {…}, category_id: '01', rating: {…}, total_view: 89, …}
// 6: {_id: '374df11ae3d9b8b9ce21f4dc53f59b85', others_info: {…}, category_id: '01', rating: {…}, total_view: 798, …}
// 7: {_id: 'be44c843d61859cc0b87cae85c55f9db', others_info: {…}, category_id: '01', rating: {…}, total_view: 231, …}
// length: 8
// [[Prototype]]: Array(0)
