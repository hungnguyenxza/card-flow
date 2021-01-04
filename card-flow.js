let classObjectTypes = ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info'];
let progressBarTypes = ['', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info'];

let cardData = data;
let tempVerticalHtml = `<div class="card-flow-vertical"></div>`;
let tempVerticalWithMarginHtml = `<div class="card-flow-vertical card-flow-vertical-left"></div>`;
var emptyCardContent = `<div class="card-content empty-card"></div>`;
var cardFlowContainer = '#card-flow-container';
var cardFlowVeritals = '#card-flow-container .card-flow-vertical';
let defaultZoomRatio = 0.8;

function drawLine(startPoint, endPoint, width, height, index, total) {
    let div = document.createElement('div');
    div.className = "div-svg";
    $(div).css({
        'width': width,
        'height': height,
    });
    let $startPoint = $(`.start-point[data-point="${startPoint}"]`);
    let $endPoint = $(`.end-point[data-point="${endPoint}"]`);
    if (!$startPoint.length || !$endPoint.length) return;
    var startX = $startPoint.position().left + ($startPoint.width() / 2);
    var startY = $startPoint.position().top + ($startPoint.width() / 2);

    var endX = $endPoint.offset().left + ($endPoint.width() / 2);
    var endY = $endPoint.offset().top + ($endPoint.width() / 2);
    // drawCurve(startX, startY, endX, endY, Math.random());
    // return;
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // svg.setAttribute('width', width);
    // svg.setAttribute('height', height);
    svg.setAttribute('xmlns', `http://www.w3.org/2000/svg`);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('class', 'svg-line');
    svg.setAttribute("data-point", `${startPoint}-${endPoint}`);
    var svgNS = svg.namespaceURI;

    var pathSvg = document.createElementNS(svgNS, 'path');
    // M

    var AX = startX;
    var AY = startY;

    // L
    var BX = Math.abs(endX - startX) * 0.05 + startX;
    var BY = startY;

    // C
    var CX = (endX - startX) * 0.66 + startX;
    var CY = startY;
    var DX = (endX - startX) * 0.33 + startX;
    var DY = endY;
    var EX = - Math.abs(endX - startX) * 0.05 + endX;
    var EY = endY;

    // L
    var FX = endX;
    var FY = endY;

    // setting up the path string
    var path = 'M' + AX + ',' + AY;
    path += ' L' + BX + ',' + BY;
    path += ' ' + 'C' + CX + ',' + CY;
    path += ' ' + DX + ',' + DY;
    path += ' ' + EX + ',' + EY;
    path += ' L' + FX + ',' + FY;

    // applying the new path to the element
    pathSvg.setAttribute("d", path);
    pathSvg.setAttribute('fill', 'none');
    pathSvg.setAttribute('stroke-width', '2px');
    pathSvg.setAttribute('stroke', 'rgb(0,0,0)');
    svg.appendChild(pathSvg);
    $(div).css({
        'background-image': `url("data:image/svg+xml, ${svg.outerHTML.replaceAll('\"', '\'')}")`,
        'background-repeat': 'no-repeat',
    });
    document.body.prepend(div);
}

function drawCurve(startPoint, endPoint, width, height, index, total) {
    let $startPoint = $(`.start-point[data-point="${startPoint}"]`);
    let $endPoint = $(`.end-point[data-point="${endPoint}"]`);
    if (!$startPoint.length || !$endPoint.length) return;

    var iconHeight = $(".start-point")[0].offsetHeight;
    let div = document.createElement('div');
    div.className = "div-svg";
    $(div).css({
        'width': width,
        'height': height,
    });

    let offSetContainer = $(cardFlowContainer).offset();

    var startX = $startPoint.offset().left - offSetContainer.left + ($startPoint.width() / 2);
    var startY = $startPoint.offset().top - offSetContainer.top + ($startPoint.width() / 2);

    var endX = $endPoint.offset().left - offSetContainer.left + ($endPoint.width() / 2);
    var endY = $endPoint.offset().top - offSetContainer.top + ($endPoint.width() / 2);

    var change = (index - 0.5 - (total / 2)) * (iconHeight / (total + 1));
    startY = startY + change;
    endY = endY + change;
    
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('xmlns', `http://www.w3.org/2000/svg`);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('class', 'svg-line');
    svg.setAttribute("data-point", `${startPoint}-${endPoint}`);
    var svgNS = svg.namespaceURI;

    var pathSvg = document.createElementNS(svgNS, 'path');

    //calculate point
    var AX = startX;
    var AY = startY;
    var cur = Math.min((endX - startX), (endY - startY)) * (0.7 / index);
    var MX = startX + cur;

    // setting up the path string

    var path = 'M' + AX + ',' + AY;
    path += ' C' + MX + ',' + startY + ' ' + MX + ',' + startY + ' ' + MX + ',' + (startY + cur);
    path += ' L' + MX + ',' + (endY - cur);
    path += ' C' + MX + ',' + endY + ' ' + MX + ',' + endY + ' ' + (MX + cur) + ',' + endY;
    path += ' L' + endX + ',' + endY;



    pathSvg.setAttribute("d", path);
    pathSvg.setAttribute('fill', 'none');
    pathSvg.setAttribute('stroke-width', '1px');
    pathSvg.setAttribute('stroke', 'rgb(0,0,0)');
    svg.appendChild(pathSvg);



    var circleSvg = document.createElementNS(svgNS, 'circle');
    circleSvg.setAttribute("cx", endX);
    circleSvg.setAttribute("cy", endY);
    circleSvg.setAttribute("r", 4);
    circleSvg.setAttribute('fill', 'black');
    circleSvg.setAttribute('stroke-width', '1px');
    circleSvg.setAttribute('stroke', 'rgb(0,0,0)');
    svg.appendChild(circleSvg);

    $(div).css({
        'background-image': `url("data:image/svg+xml, ${svg.outerHTML.replaceAll('\"', '\'')}")`,
        'background-repeat': 'no-repeat',
    });

    $('#card-flow-container').prepend(div);
}

function drawAllLine() {
    $('.div-svg').remove();
    let widthBody = $('#card-flow-container').innerWidth() - 45;
    let heightBody = $('#card-flow-container').innerHeight() - 45;

    $('.start-point').each(function () {
        let childIDs = `${$(this).data('child-ids')}`.split(',');
        for (let i = 0; i < childIDs.length; i++) {
            const childID = childIDs[i];
            let startID = $(this).data(`point`);
            let endID = `${childID},${startID}`;
            drawCurve(startID, endID, widthBody, heightBody, i + 1, childIDs.length);
        }
    });
}

function displayCards(cards) {
    $(cardFlowContainer).html('');
    for (let i = 0; i < cards.length; i++) {
        let level = 0;

        if ($(cardFlowVeritals).length < level + 1) {
            $(cardFlowContainer).append(tempVerticalHtml);
        }
        const card = cards[i];
        let numberContentInLevel = $(cardFlowVeritals).eq(level).find(`.card-content`).length;
        let firstIndex = numberContentInLevel;
        let lastIndex = firstIndex + 1;
        if (card.isExpaned && card.aligns.length) {
            let indexRanger = displayChildCards(card.aligns, level + 1, card.id, numberContentInLevel);
            firstIndex = indexRanger[0];
            lastIndex = indexRanger[1];
        }
        let numberEmptyCardContent = firstIndex - $(cardFlowVeritals).eq(level).find(`.card-content`).length;
        for (let c = 0; c < numberEmptyCardContent; c++) {
            $(cardFlowVeritals).eq(level).append(emptyCardContent);
        }
        let isFirstParent = true;
        let tempHtmlCard = getTemplateCard(card, isFirstParent);
        $(cardFlowVeritals).eq(level).append(tempHtmlCard);
    }

    drawAllLine();
}
function displayChildCards(childCards, level, parentId, parentIndex) {
    for (let i = 0; i < childCards.length; i++) {
        if ($(cardFlowVeritals).length <= level + 1) {
            $(cardFlowContainer).append(tempVerticalWithMarginHtml);
        }
        const child = childCards[i];
        let firstIndex = parentIndex;
        let lastIndex = 0;
        let numberContentInLevel = $(cardFlowVeritals).eq(level).find(`.card-content`).length;
        let currentIndex = numberContentInLevel > firstIndex ? numberContentInLevel : firstIndex;
        if (child.isExpaned && child.aligns.length) {
            let childRanger = displayChildCards(child.aligns, level + 1, child.id, currentIndex);
            firstIndex = childRanger[0];
            lastIndex = childRanger[1];
        }

        let numberEmptyCardContent = firstIndex - $(cardFlowVeritals).eq(level).find(`.card-content`).length;
        for (let c = 0; c < numberEmptyCardContent; c++) {
            $(cardFlowVeritals).eq(level).append(emptyCardContent);
        }
        let isFirstParent = false;
        let tempHtmlCard = getTemplateCard(child, isFirstParent);
        $(cardFlowVeritals).eq(level).append(tempHtmlCard);
    }
    let firstChildID = childCards[0].id;
    let lastChildID = childCards[childCards.length - 1].id;
    let firstChildIndex = $(cardFlowVeritals).find(`.card-content[data-id="${firstChildID}"]`).prevAll().length;
    let lastChildIndex = $(cardFlowVeritals).find(`.card-content[data-id="${lastChildID}"]`).prevAll().length;
    return [firstChildIndex, lastChildIndex];
}

$(document).on('click', '.start-point', function () {
    let cardContent = $(this).closest('.card-content');
    let dataPoint = $(this).closest('.start-point').data('point');
    let chainIDs = `${cardContent.data('chain-ids')}`.split(',');
    let card;
    let cardList = [...cardData];
    let id = chainIDs.pop();
    while (id) {
        card = cardList.find(c => c.id === parseInt(id));
        cardList = card.aligns;
        id = chainIDs.pop();
    }
    card.isExpaned = !card.isExpaned;

    let needScroll = true;

    if (!card.isExpaned) {
        closeAllChilds(card);
        needScroll = false;
    }

    let bufferTop = cardContent.height() / 2 + 30;
    let bufferLeft = cardContent.width() + 30;

    displayCards(cardData);

    if (needScroll) {
        setTimeout(function () {
            let offSet = $(`.start-point[data-point="${dataPoint}"]`).offset();
            let offSetContainer = $(cardFlowContainer).offset();
            let scrollTo = {
                scrollLeft: (offSet.left - offSetContainer.left - bufferLeft) * defaultZoomRatio,
                scrollTop: (offSet.top - offSetContainer.top - bufferTop) * defaultZoomRatio,
            };
            $(cardFlowContainer).animate(scrollTo, 800);
        }, 100);
    }
});

displayCards(cardData);

function getTemplateCard(card, isFirstParent) {
    let progress_class = card.objective_type - 1 < 0 || card.objective_type > progressBarTypes.length
        ? progressBarTypes[0] : progressBarTypes[card.objective_type - 1];

    let object_type_class = card.objective_type - 1 < 0 || card.objective_type > classObjectTypes.length
        ? classObjectTypes[0] : classObjectTypes[card.objective_type - 1];
    let startPointHtml = '';
    if (card.aligns.length) {
        let iconHtml = `<i class="fa fa-plus" aria-hidden="true"></i>`;
        if (card.isExpaned) {
            iconHtml = `<i class="fa fa-minus" aria-hidden="true"></i>`;
        }
        let childIDs = card.aligns.map(c => c.id);
        startPointHtml = `<div class="start-point" data-point="${card.chainIds}" data-child-ids="${childIDs}">${iconHtml}</div>`;
    }
    let endPointHtml = '';
    if (!isFirstParent) {
        endPointHtml = `<div class="end-point" data-point="${card.chainIds}"></div>`;
    }

    let result = `
    <div class="card-content" data-card-id="${card.cardId}" data-id="${card.id}" data-chain-ids="${card.chainIds}">
        <div class="card-border">
            <div class="card-title">
                <div class="card-title-border ${object_type_class}"></div>
                <div class="card-title-value">
                    <a href="#" data-title="Goal detail" title="${card.name}" hide-footer="true" class="fw-bolder btn-modal font-weight-bold">
                        ${card.name}
                    </a>
                </div>
            </div>
            <div class="card-description">
                <div class="card-avatar row align-items-center">
                    <img src="${card.lead.image_url}" class="rounded-circle" />
                </div>
                <div class="card-due-in row align-items-center">
                    <i class="la la-clock"></i><span>&nbsp;${card.due_in}</span>
                </div>
            </div>
            <div class="card-progress">
                <div class="card-progress-bar row align-items-center">
                    <div class="progress">
                        <div class="progress-bar ${progress_class} progress-bar-striped progress-bar-animated"
                            role="progressbar" aria-valuenow="${card.progress}" aria-valuemin="0" aria-valuemax="100"
                            style="width: ${card.progress}%"></div>
                    </div>
                </div>
                <div class="card-progress-value text-center row align-items-center">
                    <div class="card-progress-value-text">${card.progress}%</div>
                </div>
                <div class="card-content-menu">
                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                </div>
            </div>
            ${startPointHtml}
            ${endPointHtml}
            <div class="card-menu">
                <ul class="menu-options">
                    <li class="menu-option add-new-card">
                        <i class="fa fa-plus"></i>&nbsp;Create new goal
                    </li>
                </ul>
            </div>
        </div>
    </div>`;
    return result;
}

function closeAllChilds(card) {
    let childCards = card.aligns;
    for (let i = 0; i < childCards.length; i++) {
        const child = childCards[i];
        child.isExpaned = false;
        if (child.aligns.length) {
            closeAllChilds(child);
        }
    }
}
$(document).on('click', '.card-content-menu', function (e) {
    e.preventDefault();
    $('.card-menu').hide();
    $(e.target).closest('.card-content').find('.card-menu').show();
    return false;
});
$(document).on('click', document.body, function (e) {
    $('.card-menu').hide();
});