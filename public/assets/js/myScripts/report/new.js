"use strict";
// Class definition
var KTModalReportAdd = function () {
    var submitButton;
    var cancelButton;
    var closeButton;
    var validator;
    var form;
    var modal;
    let latitude, longitude

    // Init form inputs
    var handleForm = function () {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        FormValidation.validators.checkValidPhoneNumber = checkValidPhoneNumber;
        FormValidation.validators.checkValidFormalID = checkValidFormalID;



        validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'fullName': {
                        validators: {
                            notEmpty: {
                                message: 'الاسم الرباعي مطلوب.'
                            }
                        }
                    },
                    'nationalID': {
                        validators: {
                            notEmpty: {
                                message: 'رقم الهوية مطلوب'
                            }, checkValidFormalID: {
                                message: 'رقم الهوية غير صالح'

                            }
                        }
                    },
                    'phoneNumber': {
                        validators: {

                            notEmpty: {
                                message: 'رقم الجوال مطلوب'
                            },
                            stringLength: {
                                min: 9,
                                max: 9,
                                message: 'رقم الجوال يجب أن يحتوي على 9 رقم.'
                            },
                            checkValidPhoneNumber: {
                                message: 'رقم الجوال غير صالح'
                            }
                        }
                    },
                    'birthDate': {
                        validators: {
                            notEmpty: {
                                message: 'تاريخ الميلاد مطلوب.'
                            }
                        }
                    },

                    'city': {
                        validators: {
                            notEmpty: {
                                message: 'المدينة مطلوبة.'
                            }
                        }
                    },
                    'region': {
                        validators: {
                            notEmpty: {
                                message: 'الحي مطلوب.'
                            }
                        }
                    },

                    'carType': {
                        validators: {
                            notEmpty: {
                                message: 'نوع المركبة مطلوبة.'
                            }
                        }
                    },
                    'type': {
                        validators: {
                            notEmpty: {
                                message: 'نوع الحالة الطارئة مطلوبة.'
                            }
                        }
                    },

                    'description': {
                        validators: {
                            notEmpty: {
                                message: 'وصف الحالة مطلوب.'
                            }
                        }
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        );


        // Action buttons
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.validate().then(function (status) {
                    console.log('validated!');

                    if (status == 'Valid') {
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable submit button whilst loading
                        submitButton.disabled = true;
                        const payload = {
                            fullName: $("input[name=fullName]").val(),
                            phoneNumber: $("input[name=phoneNumber]").val(),
                            birthDate: $("input[name=birthDate]").val(),
                            city: $("select[name=city]").val(),
                            region: $("input[name=region]").val(),
                            carType: $("input[name=carType]").val(),
                            plateInfo: $("input[name=plateInfo]").val(),
                            type: $("select[name=type]").val(),
                            description: $("textarea[name=description]").val(),
                            location:{
                                latitude,
                                longitude
                            }
                        }


                        $.post('/reports/new', { payload: JSON.stringify(payload) }).then(recipientID => {
                            submitButton.removeAttribute('data-kt-indicator');

                            Swal.fire({
                                text: "تم إضافة البلاغ بنجاح!",
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: "حسنا",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            }).then(function (result) {
                                if (result.isConfirmed) {
                                    // Hide modal
                                    modal.hide();

                                    // Enable submit button after loading
                                    submitButton.disabled = false;

                                    // Redirect to customers list page
                                    location.reload()

                                }
                            })
                        }).catch(err => {
                            Swal.fire({
                                text: errDisplay(err),
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "حسنا",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            });

                            submitButton.removeAttribute('data-kt-indicator');

                        })

                    } else {
                        Swal.fire({
                            text: "حصل خطأ ما ، يرجى المحاولة مرة أخرى!",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "حسنا",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });

                        submitButton.removeAttribute('data-kt-indicator');

                    }
                });
            }
        });

        cancelButton.addEventListener('click', function (e) {
            e.preventDefault();

            Swal.fire({
                text: "هل تريد إلغاء العملية ؟",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "نعم",
                cancelButtonText: "لا",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    form.reset(); // Reset form	
                    modal.hide(); // Hide modal	
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "لم يتم إلغاء نموذج الإضافة!",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "حسنا",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        });

        closeButton.addEventListener('click', function (e) {
            e.preventDefault();

            Swal.fire({
                text: "هل أنت متأكد من إلغاء العملية ؟",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "نعم",
                cancelButtonText: "لا",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    form.reset(); // Reset form	
                    modal.hide(); // Hide modal	


                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "لم يتم إلغاء العملية!",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "حسنا",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        })



    }
    function initMap(lat , lng) {
        // Map options
        var options = {
            zoom: 15,
            center: { lat, lng }
        }

        // New map
        var map = new google.maps.Map(document.getElementById('map'), options);
           // Add marker
           var marker = new google.maps.Marker({
            position:{ lat, lng},
            map:map,
            icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
          });
    
    }
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition, geoError);
        } else {
            return null
        }
    }
    function getPosition(position) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        console.log(latitude, longitude);
        initMap(latitude , longitude)
    }
    function geoError(error) {
        Swal.fire({
            text: "يجب السماح بالحصول على الموقع الجغرافي!",
            icon: "warning",
            buttonsStyling: false,
            confirmButtonText: "حسناً",
            customClass: {
                confirmButton: "btn fw-bold btn-danger",
            }
        }).then(function (result) {
            if (result.value) {
                location.href = '/'
            }
        });

    }
    return {
        // Public functions
        init: function () {
            // Elements
            modal = new bootstrap.Modal(document.querySelector('#kt_modal_add_report'));

            form = document.querySelector('#kt_modal_add_report_form');
            submitButton = form.querySelector('#kt_modal_add_report_submit');
            cancelButton = form.querySelector('#kt_modal_add_report_cancel');
            closeButton = form.querySelector('#kt_modal_add_report_close');
            getLocation()

            $("#birthDate").daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format("YYYY"), 10)
            })


            handleForm();
        }
    };
}();


const checkValidPhoneNumber = function () {
    return {
        validate: function (input) {
            const value = input.value;
            if (!isNaN(Number(value)) && (value.indexOf('5') == 0)) {
                return {
                    valid: true,
                };
            } else {
                return {
                    valid: false,
                };
            }
        },
    };
};



const checkValidFormalID = function () {
    return {
        validate: function (input) {
            const value = input.value;
            if (!isNaN(Number(value)) && value.length == 10 && value.indexOf('0') !== 0) {
                return {
                    valid: true,
                };


            }
            return {
                valid: false,
            };

        },
    };
};



// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTModalReportAdd.init();
});