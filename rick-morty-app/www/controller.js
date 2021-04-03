function RickMortyController() {

    this.init = () => {
        RickMortyController.getCharacters();
    }

    this.getCharacters = (parameter, value) => {
        fetch(`https://rickandmortyapi.com/api/character/?${parameter}=${value}`)
            .then(response => response.json())
            .then(characters => {
                console.log('page number -> ' + characters.info.pages);
                this.pageSize = characters.info.pages;
                console.log(characters.results);
                RickMortyController.buildCharacters(characters.results);
            }).catch(error => console.log(error));
    }

    this.getLocations = (parameter, value) => {
        fetch(`https://rickandmortyapi.com/api/location/?${parameter}=${value}`)
            .then(response => response.json())
            .then(locations => {
                console.log('page number -> ' + locations.info.pages);
                this.pageSize = locations.info.pages;
                console.log(locations.results);
                RickMortyController.buildLocations(locations.results);
            }).catch(error => console.log(error));
    }

    this.getEpisodes = (parameter, value) => {
        fetch(`https://rickandmortyapi.com/api/episode/?${parameter}=${value}`)
            .then(response => response.json())
            .then(episodes => {
                console.log('page number -> ' + episodes.info.pages);
                this.pageSize = episodes.info.pages;
                console.log(episodes.results);
                RickMortyController.buildEpisodes(episodes.results);
            }).catch(error => console.log(error));
    }

    this.buildCharacters = (results) => {
        let endPoint = 'character';
        let htmlContent = ``;
        htmlContent += `
            <div class="cflex_row">
                <input type="text" placeholder="Digite um nome" id="input-search" class="search_input" ></input>
                <button class="btn search_btn" onclick="RickMortyController.seachTerm('${endPoint}')"><i class="material-icons">search</i></button>
            </div>
        `;

        results.forEach(item => {
            htmlContent += `
                <div>${item.name}</div>
            `;
        });

        htmlContent += `
            <div class="cflex_row cflex_jc_center cflex_ai_center">
                <button class="btn" onclick="RickMortyController.next('${endPoint}')"><i class="material-icons">keyboard_arrow_left</i></button>
                <div class="pagination_txt">${this.currentPage} de ${this.pageSize}</div>
                <button class="btn" onclick="RickMortyController.previuos('${endPoint}')"><i class="material-icons">keyboard_arrow_right</i></button>
            </div>
        `;
        $('#container').html(htmlContent);
    }

    this.buildLocations = (results) => {
        let endPoint = 'location';
        let htmlContent = ``;
        htmlContent += `
            <div class="cflex_row">
                <input type="text" placeholder="Digite um nome" id="input-search" class="search_input" ></input>
                <button class="btn search_btn" onclick="RickMortyController.seachTerm('${endPoint}')"><i class="material-icons">search</i></button>
            </div>
        `;

        results.forEach(item => {
            htmlContent += `
                <div>${item.name}</div>
            `;
        });

        htmlContent += `
            <div class="cflex_row cflex_jc_center cflex_ai_center">
                <button class="btn" onclick="RickMortyController.next('${endPoint}')"><i class="material-icons">keyboard_arrow_left</i></button>
                <div class="pagination_txt">${this.currentPage} de ${this.pageSize}</div>
                <button class="btn" onclick="RickMortyController.previuos('${endPoint}')"><i class="material-icons">keyboard_arrow_right</i></button>
            </div>
        `;
        $('#container').html(htmlContent);
    }

    this.buildEpisodes = (results) => {
        let endPoint = 'episode';
        let htmlContent = ``;
        htmlContent += `
            <div class="cflex_row">
                <input type="text" placeholder="Digite um nome" id="input-search" class="search_input" ></input>
                <button class="btn search_btn" onclick="RickMortyController.seachTerm('${endPoint}')"><i class="material-icons">search</i></button>
            </div>
        `;

        results.forEach(item => {
            htmlContent += `
                <div>${item.name}</div>
            `;
        });

        htmlContent += `
            <div class="cflex_row cflex_jc_center cflex_ai_center">
                <button class="btn" onclick="RickMortyController.next('${endPoint}')"><i class="material-icons">keyboard_arrow_left</i></button>
                <div class="pagination_txt">${this.currentPage} de ${this.pageSize}</div>
                <button class="btn" onclick="RickMortyController.previuos('${endPoint}')"><i class="material-icons">keyboard_arrow_right</i></button>
            </div>
        `;
        $('#container').html(htmlContent);
    }

    this.pageSize = 0;
    this.currentPage = 1;

    this.next = (endPoint) => {
        if (this.currentPage < this.pageSize) {
            this.currentPage++;
            RickMortyController.directEndPoint(endPoint, 'page', this.currentPage);
        }
    }

    this.previuos = (endPoint) => {
        if (this.currentPage > 1) {
            this.currentPage--;
            RickMortyController.directEndPoint(endPoint, 'page', this.currentPage);
        }
    }

    this.seachTerm = (endPoint) => {
        RickMortyController.directEndPoint(endPoint, 'name', $('#input-search').val());
    }

    this.directEndPoint = (endPoint, parameter, value) => {
        if (endPoint == 'character') RickMortyController.getCharacters(parameter, value);
        else if (endPoint == 'location') RickMortyController.getLocations(parameter, value);
        else if (endPoint == 'episode') RickMortyController.getEpisodes(parameter, value);
    }

}

RickMortyController.instance = null;

RickMortyController.getInstance = () => {
    if (RickMortyController.instance == null)
        RickMortyController.instance = new RickMortyController();
    return RickMortyController.instance;
}

RickMortyController.init = () => {
    RickMortyController.getInstance().init();
}

RickMortyController.getCharacters = (parameter, value) => {
    RickMortyController.getInstance().getCharacters(parameter, value);
}

RickMortyController.getLocations = (parameter, value) => {
    RickMortyController.getInstance().getLocations(parameter, value);
}

RickMortyController.getEpisodes = (parameter, value) => {
    RickMortyController.getInstance().getEpisodes(parameter, value);
}

RickMortyController.buildCharacters = (results) => {
    RickMortyController.getInstance().buildCharacters(results);
}
RickMortyController.buildLocations = (results) => {
    RickMortyController.getInstance().buildLocations(results);
}
RickMortyController.buildEpisodes = (results) => {
    RickMortyController.getInstance().buildEpisodes(results);
}
RickMortyController.next = (endPoint) => {
    RickMortyController.getInstance().next(endPoint);
}

RickMortyController.previuos = (endPoint) => {
    RickMortyController.getInstance().previuos(endPoint);
}

RickMortyController.seachTerm = (endPoint) => {
    RickMortyController.getInstance().seachTerm(endPoint);
}

RickMortyController.directEndPoint = (endPoint, parameter, value) => {
    RickMortyController.getInstance().directEndPoint(endPoint, parameter, value);
}