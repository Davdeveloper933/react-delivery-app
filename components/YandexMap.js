import React, { useEffect } from "react";
import marker from "@/assets/img/marker.png";

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
function init() {
	// Создание карты.
	var myMap = new ymaps.Map("map", {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		// Чтобы не определять координаты центра карты вручную,
		// воспользуйтесь инструментом Определение координат.
		center: [55.76, 37.64],
		// Уровень масштабирования. Допустимые значения:
		// от 0 (весь мир) до 19.
		zoom: 7,
		controls: [],
	});
	var suggestView1 = new ymaps.SuggestView("suggest1");
	const suggest1 = document.getElementById("suggest1");
	let placeName;
	let placeMarkOptions = {
		// Опции.
		// Необходимо указать данный тип макета.
		iconLayout: "default#image",
		// Своё изображение иконки метки.
		iconImageHref: marker.src,
		// Размеры метки.
		iconImageSize: [42, 42],
		// Смещение левого верхнего угла иконки относительно
		// её "ножки" (точки привязки).
	};

	let myPlacemark = new ymaps.Placemark(
		myMap.getCenter(),
		{
			hintContent: "",
			balloonContent: "",
		},
		placeMarkOptions,
	);
	myMap.geoObjects.add(myPlacemark);

	// Обработка события, возникающего при щелчке
	// левой кнопкой мыши в любой точке карты.
	// При возникновении такого события откроем балун.
	myMap.events.add("click", async function (e) {
		//if (!myMap.balloon.isOpen()) {
		var coords = e.get("coords");
		// Use the geocode method to get the name of the place
		await ymaps.geocode(coords).then((res) => {
			// Get the first GeoObject from the response
			let geoObject = res.geoObjects.get(0);

			// Get the name of the place
			placeName = geoObject.properties.get("name");

			// Display the place name
			console.log(placeName);
			suggest1.value = placeName;
		});
		myMap.geoObjects.removeAll();
		myPlacemark = new ymaps.Placemark(
			coords,
			{
				hintContent: "",
				balloonContent: "",
			},
			placeMarkOptions,
		);
		myMap.geoObjects.add(myPlacemark);
	});
}

export function YandexMap() {
	useEffect(() => {
		// code to run on component mount
		console.log("Component mounted");
		const getYmaps = require("ymaps");
		ymaps.ready(init);

		// cleanup function (optional)
		return () => {
			console.log("Component unmounted");
		};
	}, []);
	return (
		<div>
			<h1>Вот яндекс карта,видишь Стас? НА ЖРИ ! Я БОГ КОДИНГА! ХУЕСОСЫ!</h1>
			<p className="header">
				Начните вводить запрос для появления поисковой подсказки
			</p>
			<input
				type="text"
				id="suggest1"
			/>
			<div
				id="map"
				style={{ width: "600px", height: "400px" }}
			></div>
		</div>
	);
}
