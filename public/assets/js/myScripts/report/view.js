"use strict";


// Class definition
var KTModalReportView = function () {
    var followBtn = document.querySelector('#kt_user_recive_button');

    // followBtn button
    var initUserfollowBtnButton = function () {
        if (followBtn) {
            followBtn.addEventListener('click', async function (e) {
                // Prevent default action 
                e.preventDefault();

                // Show indicator
                followBtn.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click 
                followBtn.disabled = true;

                // Check button state
                if (followBtn.classList.contains("btn-success")) {
                    const req = await fetch(`/reports/recive/${reportID}?action=cancel`)
                    const res = await req.json()
                    if (res.success) {
                        followBtn.removeAttribute('data-kt-indicator');
                        followBtn.classList.remove("btn-success");
                        followBtn.classList.add("btn-light");
                        followBtn.querySelector(".svg-icon").classList.add("d-none");
                        followBtn.querySelector(".indicator-label").innerHTML = 'إستلام';
                        followBtn.disabled = false;
                    }

                } else {
                    const req = await fetch(`/reports/recive/${reportID}?action=recive`)
                    const res = await req.json()
                    if (res.success) {
                        followBtn.removeAttribute('data-kt-indicator');
                        followBtn.classList.add("btn-success");
                        followBtn.classList.remove("btn-light");
                        followBtn.querySelector(".svg-icon").classList.remove("d-none");
                        followBtn.querySelector(".indicator-label").innerHTML = 'مستلم';
                        followBtn.disabled = false;
                    }

                }
            });


        }
    }
    // Private functions
    var initMap = function (elementId) {
        // Check if Leaflet is included
        if (!L) {
            return;
        }

        // Define Map Location
        var leaflet = L.map(elementId, {
            center: [40.725, -73.985],
            zoom: 30
        });

        // Init Leaflet Map. For more info check the plugin's documentation: https://leafletjs.com/
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(leaflet);

        // Set Geocoding
        var geocodeService;
        if (typeof L.esri.Geocoding === 'undefined') {
            geocodeService = L.esri.geocodeService();
        } else {
            geocodeService = L.esri.Geocoding.geocodeService();
        }

        // Define Marker Layer
        var markerLayer = L.layerGroup().addTo(leaflet);

        // Set Custom SVG icon marker
        var leafletIcon = L.divIcon({
            bgPos: [10, 10],
            iconAnchor: [20, 37],
            popupAnchor: [0, -37],
            className: 'leaflet-marker'
        });

        // Show current address
        L.marker([40.724716, -73.984789], { icon: leafletIcon }).addTo(markerLayer).bindPopup('430 E 6th St, New York, 10009.', { closeButton: false }).openPopup();

        // Map onClick Action
        leaflet.on('click', function (e) {
            geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
                if (error) {
                    return;
                }
                markerLayer.clearLayers();
                selectedlocation = result.address.Match_addr;
                L.marker(result.latlng, { icon: leafletIcon }).addTo(markerLayer).bindPopup(result.address.Match_addr, { closeButton: false }).openPopup();

                // Show popup confirmation. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                Swal.fire({
                    html: 'Your selected - <b>"' + selectedlocation + ' - ' + result.latlng + '"</b>.',
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then(function (result) {
                    // Confirmed
                });
            });
        });
    }


    const recived = $(followBtn).attr('recived')
    console.log(recived);
    if (recived == "true") {
        followBtn.removeAttribute('data-kt-indicator');
        followBtn.classList.add("btn-success");
        followBtn.classList.remove("btn-light");
        followBtn.querySelector(".svg-icon").classList.remove("d-none");
        followBtn.querySelector(".indicator-label").innerHTML = 'مستلم';
        followBtn.disabled = false;
    } else {
        followBtn.removeAttribute('data-kt-indicator');
        followBtn.classList.remove("btn-success");
        followBtn.classList.add("btn-light");
        followBtn.querySelector(".svg-icon").classList.add("d-none");
        followBtn.querySelector(".indicator-label").innerHTML = 'إستلام';
        followBtn.disabled = false;
    }

    return {
        // Public functions
        init: function () {
            // Elements
            initUserfollowBtnButton()
            initMap('kt_contact_map');


        }
    };
}();








// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTModalReportView.init();
});