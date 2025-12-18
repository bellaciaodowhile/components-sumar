document.addEventListener('DOMContentLoaded', () => {
    console.log('IndexJS')
    // Modal invested-flow
    const triggerFlowInvested = document.querySelector('#trigger-invested-flow');
    const modalInvestedFlow = document.querySelector('.main-modal-invested-flow');
    const closeModalInvested = document.querySelector('.close-modal-invested');
    const overlay = document.querySelector('.overlay');
    
    // Variables para controlar los steps
    let currentStep = 1;
    const totalSteps = 3;
    
    // Función para mostrar/ocultar modal
    function toggleModal(show) {
        if (show) {
            modalInvestedFlow.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        } else {
            modalInvestedFlow.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaurar scroll del body
            
            // Ocultar imagen de step 3 si está visible
            const step3Image = document.getElementById('step3-image-container');
            if (step3Image) {
                step3Image.style.display = 'none';
            }
            
            // Resetear formulario al cerrar modal
            resetPaymentMethods();
            
            // Volver al step 1
            showStep(1);
        }
    }
    
    // Función para mostrar la imagen del step 3
    function showStep3Image() {
        // Ocultar el modal principal
        modalInvestedFlow.style.display = 'none';
        
        // Crear o mostrar el contenedor de la imagen si no existe
        let step3ImageContainer = document.getElementById('step3-image-container');
        if (!step3ImageContainer) {
            step3ImageContainer = document.createElement('div');
            step3ImageContainer.id = 'step3-image-container';
            step3ImageContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 10, 0.6);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1001;
                cursor: pointer;
            `;
            
            const step3Image = document.createElement('img');
            step3Image.src = './icons/step-3.png';
            step3Image.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                cursor: pointer;
            `;
            
            step3ImageContainer.appendChild(step3Image);
            document.body.appendChild(step3ImageContainer);
            
            // Agregar evento click para cerrar
            step3ImageContainer.addEventListener('click', function() {
                toggleModal(false);
            });
        } else {
            step3ImageContainer.style.display = 'flex';
        }
    }
    
    // Función para mostrar step específico
    function showStep(stepNumber) {
        // Ocultar todos los steps
        for (let i = 1; i <= totalSteps; i++) {
            const step = document.getElementById(`step-invested-${i}`);
            if (step) {
                step.classList.add('hidden');
            }
        }
        
        // Mostrar el step actual
        const currentStepEl = document.getElementById(`step-invested-${stepNumber}`);
        if (currentStepEl) {
            currentStepEl.classList.remove('hidden');
        }
        
        currentStep = stepNumber;
        updateNextButton();
        updatePrevButton();
    }
    
    // Función para actualizar la visibilidad del botón anterior
    function updatePrevButton() {
        const prevButton = document.querySelector('.prev-modal-invested');
        
        if (prevButton) {
            if (currentStep > 1) {
                // Mostrar botón anterior si no estamos en el primer step
                prevButton.classList.remove('hidden');
            } else {
                // Ocultar botón anterior si estamos en el primer step
                prevButton.classList.add('hidden');
            }
        }
    }
    
    // Función para actualizar el botón siguiente según el step
    function updateNextButton() {
        const nextButton = document.querySelector('.btn-sumar--invested');
        const nextButtonText = nextButton.querySelector('.btn-sumar-text');
        
        if (currentStep === 1) {
            nextButtonText.textContent = 'Siguiente';
            nextButton.classList.remove('btn-sumar--fill');
        } else if (currentStep === 2) {
            // En step 2, el botón se actualiza según el método de pago seleccionado
            updatePaymentButton();
        } else if (currentStep === 3) {
            nextButtonText.textContent = 'Finalizar';
            nextButton.classList.add('btn-sumar--fill');
        }
    }
    
    // Abrir modal
    if (triggerFlowInvested) {
        triggerFlowInvested.onclick = function (e) {
            e.preventDefault();
            toggleModal(true);
            showStep(1); // Mostrar primer step
        }
    }
    
    // Cerrar modal con X
    if (closeModalInvested) {
        closeModalInvested.onclick = function (e) {
            e.preventDefault();
            toggleModal(false);
        }
    }
    
    // Cerrar modal con overlay
    if (overlay) {
        overlay.onclick = function (e) {
            if (e.target === overlay) {
                toggleModal(false);
            }
        }
    }
    
    // Cerrar modal con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalInvestedFlow.style.display === 'flex') {
            toggleModal(false);
        }
    });
    
    // Funcionalidad del botón anterior
    const prevButton = document.querySelector('.prev-modal-invested');
    if (prevButton) {
        prevButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (currentStep > 1) {
                // Si retrocedemos desde step 2, deseleccionar métodos de pago
                if (currentStep === 2) {
                    resetPaymentMethods();
                }
                
                // Retroceder al step anterior
                showStep(currentStep - 1);
            }
        });
    }
    
    // Función para resetear métodos de pago
    function resetPaymentMethods() {
        // Resetear método seleccionado
        selectedPaymentMethod = null;
        
        // Deseleccionar todos los radio buttons
        paymentRadios.forEach(radio => {
            radio.checked = false;
            radio.parentElement.classList.remove('radio-active');
        });
        
        // Ocultar todas las descripciones
        Object.values(descriptions).forEach(desc => {
            if (desc) desc.classList.remove('active');
        });
        
        // Resetear archivo adjunto
        hasFileAttached = false;
        fileInput.value = '';
        fileDisplayContainer.innerHTML = '';
        
        // Limpiar error de upload
        const errorUpload = document.getElementById('error-upload');
        if (errorUpload) {
            errorUpload.textContent = '';
        }
        
        // Limpiar error de métodos de pago
        const errorPaymentMethods = document.getElementById('error-payments-methods');
        if (errorPaymentMethods) {
            errorPaymentMethods.textContent = '';
        }
        
        // Ocultar support-cta
        const supportCta = document.querySelector('#support-cta');
        if (supportCta) {
            supportCta.classList.add('hidden');
        }
        
        // Establecer flex-end por defecto en el footer
        const modalFooter = document.querySelector('.modal-invested-footer');
        if (modalFooter) {
            modalFooter.style.justifyContent = 'flex-end';
        }
        
        // Resetear icono del botón a arrow.png por defecto
        const nextButton = document.querySelector('.btn-sumar--invested');
        const nextButtonIcon = nextButton?.querySelector('.btn-sumar-icon img');
        if (nextButtonIcon) {
            nextButtonIcon.src = './icons/arrow.png';
        }
        
        // Actualizar botón
        updatePaymentButton();
    }

    // 1. Obtener los elementos del DOM (usando los nuevos IDs)
    const investedAmountInput = document.getElementById('investedAmount');
    const investedOptionButtons = document.querySelectorAll('.invested-option-button');

    const investedProjectedTotalEl = document.getElementById('investedProjectedTotal');
    const investedTotalInterestEl = document.getElementById('investedTotalInterest');
    const investedMonthlyInterestEl = document.getElementById('investedMonthlyInterest');
    const investedWithdrawalDateEl = document.getElementById('investedWithdrawalDate');

    // Estado inicial de la calculadora (usando prefijo invested)
    let investedCurrentAmount = 0;
    let investedCurrentMonths = 6;
    let investedCurrentRate = 0.05;

    // 2. Función para formatear números a moneda
    const formatCurrency = (number) => {
        return number.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    // 3. Función principal de cálculo y actualización
    const calculateAndDisplay = () => {
        // C: Capital (Cantidad a invertir)
        const C = investedCurrentAmount;
        // r: Tasa de interés anual
        const r = investedCurrentRate;
        // t: Tiempo en años (Meses / 12)
        const t = investedCurrentMonths / 12;

        // ** CÁLCULOS **

        // Interés Total (I = C * r * t) - Interés Simple Anual
        const totalInterest = C * r * t;

        // Total Proyectado (M = C + I)
        const projectedTotal = C + totalInterest;

        // Renta Mensual (Interés / Meses)
        const monthlyInterest = totalInterest / investedCurrentMonths;

        // Fecha de Retiro
        const startDate = new Date();
        const withdrawalDate = new Date(startDate.getFullYear(), startDate.getMonth() + investedCurrentMonths, startDate.getDate());

        // ** ACTUALIZACIÓN DEL DOM **

        investedProjectedTotalEl.textContent = formatCurrency(projectedTotal);
        investedTotalInterestEl.textContent = formatCurrency(totalInterest);
        investedMonthlyInterestEl.textContent = formatCurrency(monthlyInterest);

        // Formatear la fecha
        const day = withdrawalDate.getDate();
        const year = withdrawalDate.getFullYear();
        const monthName = withdrawalDate.toLocaleString('es-ES', {
            month: 'long'
        });
        investedWithdrawalDateEl.textContent = `${day} de ${monthName} ${year}`;
    };

    // Función para formatear número con separador de miles (manual)
    const formatNumberWithThousands = (number) => {
        // Convertir a string y agregar puntos cada 3 dígitos desde la derecha
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    
    // Función para limpiar formato y obtener número
    const cleanNumberFormat = (formattedString) => {
        return parseFloat(formattedString.replace(/\./g, '')) || 0;
    };

    // Función para calcular el ancho dinámico del input
    const calculateInputWidth = (text) => {
        const characterWidth = 20; // px por carácter
        const padding = 0; // padding adicional para comodidad
        const minWidth = 24; // ancho mínimo
        
        const width = (text.length * characterWidth) + padding;
        return Math.max(width, minWidth);
    };

    // Función para actualizar el ancho del input
    const updateInputWidth = (inputElement, value) => {
        const displayValue = value > 0 ? formatNumberWithThousands(value) : '0';
        const newWidth = calculateInputWidth(displayValue);
        inputElement.style.width = newWidth + 'px';
    };

    // Cambiar el tipo de input a text para permitir formateo
    if (investedAmountInput.type === 'number') {
        investedAmountInput.type = 'text';
    }

    // 4. Listeners para el Input de Cantidad
    investedAmountInput.addEventListener('input', (e) => {
        // Obtener solo los números del valor ingresado (eliminar puntos y otros caracteres)
        const rawValue = e.target.value.replace(/[^\d]/g, '');
        
        // Validar que no esté vacío
        if (rawValue === '') {
            e.target.value = '0';
            investedCurrentAmount = 0;
            updateInputWidth(e.target, 0);
            calculateAndDisplay();
            return;
        }
        
        let value = parseInt(rawValue);
        
        // Validar que el número sea válido
        if (isNaN(value) || value < 0) {
            value = 0;
        }
        
        // Actualizar valor interno
        investedCurrentAmount = value;
        
        // Formatear y mostrar en el input con puntos de miles
        const formattedValue = formatNumberWithThousands(value);
        e.target.value = formattedValue;
        
        // Actualizar ancho dinámicamente
        updateInputWidth(e.target, value);
        
        calculateAndDisplay();
    });

    // Prevenir entrada de caracteres no numéricos
    investedAmountInput.addEventListener('keypress', (e) => {
        // Permitir solo números y teclas de control
        if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }
    });

    // Formatear valor inicial al cargar (siempre 0)
    investedAmountInput.value = '0';
    updateInputWidth(investedAmountInput, 0);

    // 5. Listeners para las Opciones de Plazo (6 o 12 meses)
    investedOptionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover 'invested-selected' de todos y añadirlo al clickeado
            investedOptionButtons.forEach(btn => btn.classList.remove('invested-selected'));
            button.classList.add('invested-selected');

            // Actualizar el estado
            investedCurrentMonths = parseInt(button.getAttribute('data-months'));
            investedCurrentRate = parseFloat(button.getAttribute('data-rate'));

            calculateAndDisplay();
        });
    });

    // 6. Inicializar la calculadora con los valores por defecto
    calculateAndDisplay();


    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const descriptions = {
        card: document.getElementById('descriptionCard'),
        transfer: document.getElementById('descriptionTransfer')
    };

    // 2. Función para actualizar las descripciones
    const updateDescriptions = (selectedMethod) => {
        for (const method in descriptions) {
            const descriptionElement = descriptions[method];
            
            if (method === selectedMethod) {
                // Mostrar la descripción seleccionada
                descriptionElement.classList.add('active');
            } else {
                // Ocultar las otras descripciones
                descriptionElement.classList.remove('active');
            }
        }
    };

    // Variable para controlar el método de pago seleccionado
    let selectedPaymentMethod = null;

    // Función para actualizar el botón según el método de pago
    function updatePaymentButton() {
        const nextButton = document.querySelector('.btn-sumar--invested');
        const nextButtonText = nextButton.querySelector('.btn-sumar-text');
        const nextButtonIcon = nextButton.querySelector('.btn-sumar-icon img');
        const supportCta = document.querySelector('#support-cta');
        const modalFooter = document.querySelector('.modal-invested-footer');
        
        if (!selectedPaymentMethod) {
            // Sin método seleccionado
            nextButton.classList.remove('btn-sumar--fill');
            nextButtonText.textContent = 'Siguiente';
            if (nextButtonIcon) {
                nextButtonIcon.src = './icons/arrow.png';
            }
            // Ocultar support-cta
            if (supportCta) {
                supportCta.classList.add('hidden');
            }
            // Establecer flex-end por defecto
            if (modalFooter) {
                modalFooter.style.justifyContent = 'flex-end';
            }
            return;
        }
        
        // Con método seleccionado, siempre agregar clase fill
        nextButton.classList.add('btn-sumar--fill');
        
        if (selectedPaymentMethod === 'card') {
            // Método tarjeta
            nextButtonText.textContent = 'Solicitar link de pago';
            if (nextButtonIcon) {
                nextButtonIcon.src = './icons/ic_baseline-whatsapp.png';
            }
            // Ocultar support-cta para tarjeta
            if (supportCta) {
                supportCta.classList.add('hidden');
            }
            // Mantener flex-end para tarjeta
            if (modalFooter) {
                modalFooter.style.justifyContent = 'flex-end';
            }
        } else if (selectedPaymentMethod === 'transfer') {
            // Método transferencia
            if (hasFileAttached) {
                nextButtonText.textContent = 'Guardar y confirmar';
                warningAlert.classList.add('hidden');
            } else {
                nextButtonText.textContent = 'Continuar sin adjuntar';
                warningAlert.classList.remove('hidden');
            }
            if (nextButtonIcon) {
                nextButtonIcon.src = './icons/arrow.png';
            }
            // Mostrar support-cta solo para transferencia en step 2
            if (supportCta) {
                if (currentStep === 2) {
                    supportCta.classList.remove('hidden');
                } else {
                    supportCta.classList.add('hidden');
                }
            }
            // Cambiar a space-between para transferencia en step 2
            if (modalFooter) {
                if (currentStep === 2) {
                    modalFooter.style.justifyContent = 'space-between';
                } else {
                    modalFooter.style.justifyContent = 'flex-end';
                }
            }
        }
    }

    // 3. Listener para todos los radio buttons
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            selectedPaymentMethod = event.target.value;
            paymentRadios.forEach(rd => rd.parentElement.classList.remove('radio-active'))
            radio.parentElement.classList.add('radio-active')
            updateDescriptions(selectedPaymentMethod);
            updatePaymentButton();
            
            // Limpiar error de métodos de pago si existe
            const errorPaymentMethods = document.getElementById('error-payments-methods');
            if (errorPaymentMethods) {
                errorPaymentMethods.textContent = '';
            }
        });
    });

    // 4. Inicializar: Si alguna opción está marcada por defecto (opcional)
    const initialSelection = document.querySelector('input[name="paymentMethod"]:checked');
    if (initialSelection) {
        updateDescriptions(initialSelection.value);
    }


    const uploadTrigger = document.getElementById('upload-trigger');
    const fileInput = document.getElementById('proof-upload');
    const fileDisplayContainer = document.getElementById('file-display-container');
    const warningAlert = document.querySelector('.alert-invested--warning');
    const nextButton = document.querySelector('.btn-sumar--invested');
    const nextButtonText = nextButton.querySelector('.btn-sumar-text');
    const MAX_SIZE_MB = 25;
    let hasFileAttached = false;

    // Función para actualizar UI según estado del comprobante
    function updateUIBasedOnFileStatus() {
        if (currentStep === 2) {
            updatePaymentButton();
        }
    }
    
    // Funcionalidad del botón siguiente
    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (currentStep === 1) {
            // Validar primer paso antes de avanzar
            if (validateStep1()) {
                showStep(currentStep + 1);
                updateStep2Values();
            }
        } else if (currentStep === 2) {
            // Validar método de pago seleccionado
            if (validateStep2()) {
                if (selectedPaymentMethod === 'card') {
                    // Método tarjeta: ir a WhatsApp
                    const message = `Hola, quiero solicitar el link de pago para mi inversión de ${investedCurrentAmount}€`;
                    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                    toggleModal(false);
                } else if (selectedPaymentMethod === 'transfer') {
                    // Método transferencia: mostrar imagen de step 3
                    showStep3Image();
                }
            }
        } else if (currentStep === 3) {
            // Finalizar flujo (step 3)
            console.log('Flujo completado');
            toggleModal(false);
        }
    });
    
    // Función para validar el step 1
    function validateStep1() {
        const errorInvested = document.getElementById('error-invested');
        let isValid = true;
        let errorMessage = '';
        
        // Limpiar error previo
        if (errorInvested) {
            errorInvested.textContent = '';
        }
        
        // Validar que hay un monto
        if (!investedCurrentAmount || investedCurrentAmount <= 0) {
            errorMessage = 'Ingresar monto';
            isValid = false;
        }
        // Validar monto mínimo
        else if (investedCurrentAmount < 100) {
            errorMessage = 'El monto mínimo es de 100 €';
            isValid = false;
        }
        
        // Mostrar error si existe
        if (!isValid && errorInvested) {
            errorInvested.textContent = errorMessage;
        }
        
        return isValid;
    }
    
    // Función para validar el step 2
    function validateStep2() {
        const errorPaymentMethods = document.getElementById('error-payments-methods');
        let isValid = true;
        
        // Limpiar error previo
        if (errorPaymentMethods) {
            errorPaymentMethods.textContent = '';
        }
        
        // Validar que hay un método de pago seleccionado
        if (!selectedPaymentMethod) {
            if (errorPaymentMethods) {
                errorPaymentMethods.textContent = 'Debe elegir un método de pago';
            }
            isValid = false;
        }
        
        return isValid;
    }
    
    // Función para actualizar valores en step 2
    function updateStep2Values() {
        const valueInvestedEl = document.getElementById('value-invested');
        if (valueInvestedEl) {
            valueInvestedEl.textContent = investedCurrentAmount.toLocaleString('es-ES');
        }
        
        // Actualizar todos los valores en el detalle del step 2
        const step2Elements = {
            projectedTotal: document.querySelector('#step-invested-2 .invested-result-item:nth-child(2) .invested-value'),
            totalInterest: document.querySelector('#step-invested-2 .invested-result-item:nth-child(3) .invested-value'),
            monthlyInterest: document.querySelector('#step-invested-2 .invested-result-item:nth-child(4) .invested-value'),
            annualInterest: document.querySelector('#step-invested-2 .invested-result-item:nth-child(5) .invested-value'),
            term: document.querySelector('#step-invested-2 .invested-result-item:nth-child(6) .invested-value'),
            withdrawalDate: document.querySelector('#step-invested-2 .invested-result-item:nth-child(7) .invested-value')
        };
        
        // Calcular valores
        const C = investedCurrentAmount;
        const r = investedCurrentRate;
        const t = investedCurrentMonths / 12;
        const totalInterest = C * r * t;
        const projectedTotal = C + totalInterest;
        const monthlyInterest = totalInterest / investedCurrentMonths;
        
        // Fecha de retiro
        const startDate = new Date();
        const withdrawalDate = new Date(startDate.getFullYear(), startDate.getMonth() + investedCurrentMonths, startDate.getDate());
        const day = withdrawalDate.getDate();
        const year = withdrawalDate.getFullYear();
        const monthName = withdrawalDate.toLocaleString('es-ES', { month: 'long' });
        
        // Actualizar elementos si existen
        if (step2Elements.projectedTotal) step2Elements.projectedTotal.textContent = formatCurrency(projectedTotal);
        if (step2Elements.totalInterest) step2Elements.totalInterest.textContent = formatCurrency(totalInterest);
        if (step2Elements.monthlyInterest) step2Elements.monthlyInterest.textContent = formatCurrency(monthlyInterest);
        if (step2Elements.annualInterest) step2Elements.annualInterest.textContent = `${(r * 100)}%`;
        if (step2Elements.term) step2Elements.term.textContent = `${investedCurrentMonths} meses`;
        if (step2Elements.withdrawalDate) step2Elements.withdrawalDate.textContent = `${day} de ${monthName} ${year}`;
    }

    // 1. Asocia el clic del elemento visual al input de archivo oculto
    uploadTrigger.addEventListener('click', () => {
        fileInput.click();
    });

    // 2. Maneja la selección del archivo
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            // Validar tamaño
            const fileSizeMB = file.size / (1024 * 1024);
            if (fileSizeMB > MAX_SIZE_MB) {
                showFileError('size');
                return;
            }

            // Validar formato
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                showFileError('format');
                return;
            }

            renderFileDisplay(file);
        }
    });

    // Función para mostrar errores específicos
    function showFileError(errorType) {
        let errorMessage = '';
        
        switch(errorType) {
            case 'size':
                errorMessage = 'El archivo supera el tamaño permitido.';
                break;
            case 'format':
                errorMessage = 'No es compatible';
                break;
            case 'general':
            default:
                errorMessage = 'Ha ocurrido un error';
                break;
        }
        
        // Mostrar error en el elemento error-upload
        const errorUpload = document.getElementById('error-upload');
        if (errorUpload) {
            errorUpload.textContent = errorMessage;
        }
        
        fileInput.value = ''; // Limpia el input
        fileDisplayContainer.innerHTML = ''; // Limpia la vista
        hasFileAttached = false;
        updateUIBasedOnFileStatus();
    }

    // 3. Renderiza el componente del archivo adjuntado
    function renderFileDisplay(file) {
        try {
            // Limpiar error de upload si existe
            const errorUpload = document.getElementById('error-upload');
            if (errorUpload) {
                errorUpload.textContent = '';
            }
            
            // Formatear el tamaño del archivo a KB o MB
            const size = file.size >= 1024 * 1024 
                ? `${(file.size / (1024 * 1024)).toFixed(1)}MB`
                : `${(file.size / 1024).toFixed(0)}KB`;

            const fileHTML = `
                <div class="file-item">
                    <div class="file-details">
                        <span class="icon-file">
                            <img src="./icons/file.png" alt="Icon File">
                        </span>
                        <span class="file-name">${file.name} / ${size}</span>
                    </div>
                    <span class="close-button" id="remove-file-button">&times;</span>
                </div>
            `;
            
            fileDisplayContainer.innerHTML = fileHTML;
            
            // Actualizar estado y UI
            hasFileAttached = true;
            updateUIBasedOnFileStatus();
            
            // 4. Agrega el listener para remover el archivo
            document.getElementById('remove-file-button').addEventListener('click', removeFile);
        } catch (error) {
            showFileError('general');
        }
    }

    // 5. Función para remover el archivo
    function removeFile() {
        fileDisplayContainer.innerHTML = ''; // Oculta el elemento visual
        fileInput.value = ''; // Muy importante: resetea el input file
        hasFileAttached = false;
        updateUIBasedOnFileStatus();
    }

    // 6. Inicializar UI al cargar la página
    updateUIBasedOnFileStatus();
    
    // Inicializar footer con flex-end por defecto
    const modalFooter = document.querySelector('.modal-invested-footer');
    if (modalFooter) {
        modalFooter.style.justifyContent = 'flex-end';
    }
    
    // Inicializar support-cta oculto por defecto
    const supportCta = document.querySelector('#support-cta');
    if (supportCta) {
        supportCta.classList.add('hidden');
    }

    // Funcionalidad para expandir/retraer detalle de inversión
    const detailInvestedHeader = document.querySelector('.detail-invested-header');
    const detailInvestedContent = document.querySelector('.detail-invested-content');
    const chevronIcon = detailInvestedHeader?.querySelector('img');
    
    if (detailInvestedHeader && detailInvestedContent) {
        // Configurar estado inicial cerrado
        detailInvestedContent.style.overflow = 'hidden';
        detailInvestedContent.style.maxHeight = '0';
        detailInvestedContent.style.opacity = '0';
        detailInvestedContent.style.transform = 'translateY(-10px)';
        detailInvestedContent.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Configurar transición del chevron (inicialmente apuntando hacia abajo)
        if (chevronIcon) {
            chevronIcon.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            chevronIcon.style.transform = 'rotate(0deg)';
        }
        
        let isExpanded = false;
        let isAnimating = false;
        
        detailInvestedHeader.addEventListener('click', function() {
            if (isAnimating) return;
            
            isAnimating = true;
            
            // Efecto de click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateX(0)';
            }, 100);
            
            if (isExpanded) {
                // Contraer con animación suave
                const currentHeight = detailInvestedContent.scrollHeight;
                detailInvestedContent.style.maxHeight = currentHeight + 'px';
                
                // Forzar reflow
                detailInvestedContent.offsetHeight;
                
                // Animar hacia cerrado
                detailInvestedContent.style.maxHeight = '0';
                detailInvestedContent.style.opacity = '0';
                detailInvestedContent.style.transform = 'translateY(-10px)';
                
                if (chevronIcon) {
                    chevronIcon.style.transform = 'rotate(0deg)';
                }
                
                isExpanded = false;
                
                setTimeout(() => {
                    isAnimating = false;
                }, 400);
                
            } else {
                // Expandir con animación suave
                const targetHeight = detailInvestedContent.scrollHeight;
                
                detailInvestedContent.style.maxHeight = targetHeight + 'px';
                detailInvestedContent.style.opacity = '1';
                detailInvestedContent.style.transform = 'translateY(0)';
                
                if (chevronIcon) {
                    chevronIcon.style.transform = 'rotate(180deg)';
                }
                
                isExpanded = true;
                
                // Después de la animación, remover la restricción de altura
                setTimeout(() => {
                    detailInvestedContent.style.maxHeight = 'none';
                    isAnimating = false;
                }, 400);
            }
        });
    }

    // Funcionalidad de copiar texto
    const copyTriggers = document.querySelectorAll('.trigger-copy-text');
    
    copyTriggers.forEach(trigger => {
        trigger.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Encontrar el elemento padre .copy-text
            const copyContainer = trigger.closest('.copy-text');
            if (!copyContainer) return;
            
            // Encontrar el elemento .text dentro del contenedor
            const textElement = copyContainer.querySelector('.text');
            if (!textElement) return;
            
            const textToCopy = textElement.textContent.trim();
            
            try {
                // Copiar al portapapeles
                await navigator.clipboard.writeText(textToCopy);
                
                // Feedback visual: cambiar icono a verde
                showCopySuccess(trigger);
                
            } catch (error) {
                // Fallback para navegadores que no soportan clipboard API
                fallbackCopyText(textToCopy);
                showCopySuccess(trigger);
            }
        });
    });
    
    // Función para mostrar feedback visual de copia exitosa
    function showCopySuccess(trigger) {
        // Guardar la imagen original
        const originalSrc = trigger.src;
        
        // Animación de salida (fade out)
        trigger.style.opacity = '0';
        trigger.style.transform = 'scale(0.8)';
        
        // Cambiar imagen después de la animación de salida
        setTimeout(() => {
            trigger.src = './icons/doble-verificacion.png';
            
            // Animación de entrada (fade in)
            trigger.style.opacity = '1';
            trigger.style.transform = 'scale(1)';
            
            // Restaurar imagen original después de 3 segundos
            setTimeout(() => {
                // Animación de salida para el check
                trigger.style.opacity = '0';
                trigger.style.transform = 'scale(0.8)';
                
                // Cambiar de vuelta a la imagen original
                setTimeout(() => {
                    trigger.src = originalSrc;
                    
                    // Animación de entrada para la imagen original
                    trigger.style.opacity = '1';
                    trigger.style.transform = 'scale(1)';
                }, 200);
                
            }, 3000);
            
        }, 200);
    }
    
    // Función fallback para copiar texto (navegadores antiguos)
    function fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Error al copiar texto:', err);
        }
        
        document.body.removeChild(textArea);
    }

});