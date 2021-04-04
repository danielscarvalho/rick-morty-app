
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

    this.getCharacter = (characterId) => {
        return fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
            .then(response => response.json());
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
        let htmlContent = RickMortyController.buildSearchInput('character');

        results.forEach(item => {
            htmlContent += `
                <div data-id=${item.id}" onclick="RickMortyController.showModal(${item.id})">${item.name}</div>
            `;
        });

        htmlContent += RickMortyController.buildPaginationControl('character');
        $('#container').html(htmlContent);
    }

    this.buildDetailedCharacter = (detailedCharacter) => {
        let htmlContent = `
            <img class="modal_image" src="${detailedCharacter.image}" />
            <div class="modal-content">
                <h4>${detailedCharacter.name}</h4>
                <h5>Status: ${detailedCharacter.status}</h5>
                <h5>Espécie: ${detailedCharacter.species}</h5>
                <h5>Gênero: ${detailedCharacter.gender}</h5>
                <button class="btn back_btn" onclick="RickMortyController.closeModal()"> voltar </button>
            </div>
        `;
        $('#core_modal').html(htmlContent);
    }

    this.buildDetailedLocation = (detailedLocation) => {
        let htmlContent = `
            <img class="modal_image" src="${detailedLocation.image}" />
            <div class="modal-content">
                <h4>${detailedLocation.name}</h4>
                <h5>Status: ${detailedLocation.status}</h5>
                <h5>Espécie: ${detailedLocation.species}</h5>
                <h5>Gênero: ${detailedLocation.gender}</h5>
                <button class="btn back_btn" onclick="RickMortyController.closeModal()"> voltar </button>
            </div>
        `;
        $('#core_modal').html(htmlContent);
    }

    this.showModal = (characterId) => {
        RickMortyController.getCharacter(characterId)
            .then(detailedCharacter => {
                RickMortyController.buildDetailedCharacter(detailedCharacter);
            })
            .then(() => {
                $('#core_modal').modal('open');
            });
    };

    this.closeModal = () => {
        $('#core_modal').modal('close');
    };

    this.buildLocations = (results) => {
        let htmlContent = RickMortyController.buildSearchInput('location');

        results.forEach(item => {
            htmlContent += `
                <div>${item.name}</div>
            `;
        });

        htmlContent += RickMortyController.buildPaginationControl('location');
        $('#container').html(htmlContent);
    }

    this.buildEpisodes = (results) => {
        let htmlContent = RickMortyController.buildSearchInput('episode');

        results.forEach(item => {
            htmlContent += `
                <div>${item.name}</div>
            `;
        });

        htmlContent += RickMortyController.buildPaginationControl('episode');
        $('#container').html(htmlContent);
    }

    this.buildSearchInput = (endPoint) => {
        return `
            <div class="cflex_row">
                <input type="text" placeholder="Digite um nome" id="input-search" class="search_input" ></input>
                <button class="btn search_btn" onclick="RickMortyController.seachTerm('${endPoint}')"><i class="material-icons">search</i></button>
            </div>
        `;
    }

    this.buildPaginationControl = (endPoint) => {
        return `
            <div class="cflex_row cflex_jc_center cflex_ai_center">
                <button class="btn pagination_btn" onclick="RickMortyController.next('${endPoint}')"><i class="material-icons">keyboard_arrow_left</i></button>
                <div class="pagination_txt">${this.currentPage} de ${this.pageSize}</div>
                <button class="btn pagination_btn" onclick="RickMortyController.previuos('${endPoint}')"><i class="material-icons">keyboard_arrow_right</i></button>
            </div>
        `;
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

RickMortyController.getCharacter = (characterId) => {
    return RickMortyController.getInstance().getCharacter(characterId);
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
RickMortyController.buildDetailedCharacter = (result) => {
    RickMortyController.getInstance().buildDetailedCharacter(result);
}
RickMortyController.buildLocations = (results) => {
    RickMortyController.getInstance().buildLocations(results);
}
RickMortyController.showModal = (characterId) => {
 RickMortyController.getInstance().showModal(characterId);
};
RickMortyController.closeModal = () => {
 RickMortyController.getInstance().closeModal();
};
RickMortyController.buildEpisodes = (results) => {
    RickMortyController.getInstance().buildEpisodes(results);
}
RickMortyController.buildSearchInput = (endPoint) => {
    return RickMortyController.getInstance().buildSearchInput(endPoint);
}
RickMortyController.buildPaginationControl = (endPoint) => {
    return RickMortyController.getInstance().buildPaginationControl(endPoint);
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