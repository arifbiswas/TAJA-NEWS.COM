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
    // All category
    const childDiv = document.createElement("div");
    childDiv.classList.add("category");
    childDiv.innerHTML = `
        <button onclick="showNewsByCategory('${category_id}','${category_name}')">${category_name}</button>
        `;
    categoryContainer.appendChild(childDiv);
  });
};
categoryDisplay();

const showNewsByCategory = async (id = "All News", name) => {
  // console.log(id,name);
    const spinner = document.getElementById('spiner');
    spinner.classList.remove("hidden");

  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const respons = await fetch(url);
  const data = await respons.json();
  // console.log(data.data);

  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  const loadnews = data.data;

  // sort opption 
   loadnews.sort((a,b)=> b.total_view-a.total_view);
  

  // found of number news
  const foundTotalNews = loadnews.length;
  // console.log(foundTotalNews);
  const totalFoundNewsContainer = document.getElementById("found-category");
  totalFoundNewsContainer.textContent = "";
  const childH5 = document.createElement("h5");
  childH5.innerText = `${foundTotalNews} Found News ${name}`;
  totalFoundNewsContainer.appendChild(childH5);

  // all proparties
  loadnews.forEach((news) => {
      //  console.log(news);
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
    //    author proparties
    const { name, img, published_date } = author;
    // console.log(author);
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("card", "md:card-side", "bg-base-100");
    newsDiv.innerHTML = `
        <figure>
            <img class="h-96 w-96" src="${thumbnail_url}" alt="Movie" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p class="text-zinc-600 ">${details.slice(0, 400) + "..."}</p>
            <div class="card-actions justify-between items-center">
                <div class="flex justify-between items-center ">
                    <div class="avatar online mr-4">
                        <div class="w-12 rounded-full">
                            <img src="${img}" />
                        </div>
                        </div>
                        
                        <div>
                            <h4>${name === null ? "No found" : name}</h4>
                        </div>
                        
                    </div>
                    <div >
                         <p class="text-gray-600"><i class="fa-sharp fa-solid fa-eye"></i> ${
                           total_view === null ? "No found" : total_view
                         }</p>
                        </div>
                        <label onclick="newsDetail('${_id}')" for="my-modal" class="btn modal-button  bg-white text-gray-500 hover:bg-white border-sky-400 hover:text-sky-400"><i class="fa-sharp fa-solid fa-arrow-right"></i></label>
                         
                    </div>
                    
                </div>
          </div>
        `;
      newsContainer.appendChild(newsDiv);
      const spinner = document.getElementById("spiner");
      spinner.classList.add("hidden");
  });
};
//  Modal section
const newsDetail = async (alldetails) => {
  const url = `https://openapi.programming-hero.com/api/news/${alldetails}`;
  const respons = await fetch(url);
  const data = await respons.json();
  const loaddetail = data.data[0];
  console.log(loaddetail);
  const {
    author,
    details,
    image_url,
    others_info,
    thumbnail_url,
    title,
    total_view,
    _id,
  } = loaddetail;
  const { name, img, published_date } = author;

  const modalContainer = document.getElementById("modal-body");
  modalContainer.textContent = "";

  const childDiv = document.createElement("div");
  childDiv.classList.add("modal-box");
  childDiv.innerHTML = `
            <div class="flex justify-between mb-4">
            <h6 class="text-xs"> Post by : ${
              name === null ? "No found" : name
            }</h6>
            
            <h6 class="text-xs">${
              published_date === null ? "No found" : published_date
            }</h6>
            </div>


            <img src="${image_url}"/>
            <h3 class="font-bold text-lg">
              ${title === null ? "No found" : title}
            </h3>
            <p class="py-4">
              ${details === null ? "No found" : details}
            </p>
            <div class="modal-action">
              <label for="my-modal" class="btn modal-button  bg-white text-gray-500 hover:bg-white border-sky-400 hover:text-sky-400">Close</label>
            </div>
    `;
  modalContainer.appendChild(childDiv);
};


