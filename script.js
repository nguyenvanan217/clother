// ===== PRICE SLIDER FILTER =====
const minPriceSlider = document.getElementById('minPrice');
const maxPriceSlider = document.getElementById('maxPrice');
const priceInputs = document.querySelectorAll('.price-input');

if (minPriceSlider && maxPriceSlider) {
    function updatePriceDisplay() {
        const minValue = parseInt(minPriceSlider.value);
        const maxValue = parseInt(maxPriceSlider.value);

        // Đảm bảo min không lớn hơn max
        if (minValue > maxValue) {
            minPriceSlider.value = maxValue;
            return;
        }

        // Cập nhật hiển thị giá
        if (priceInputs[0]) {
            priceInputs[0].value = minValue.toLocaleString('vi-VN') + 'đ';
        }
        if (priceInputs[1]) {
            priceInputs[1].value = maxValue.toLocaleString('vi-VN') + 'đ';
        }

        // Lọc sản phẩm theo giá (có thể mở rộng sau)
        filterProductsByPrice(minValue, maxValue);
    }

    // Hàm lọc sản phẩm theo khoảng giá
    function filterProductsByPrice(min, max) {
        const products = document.querySelectorAll('.product-item');

        products.forEach(product => {
            const priceText = product.querySelector('.price-current').textContent;
            // Loại bỏ ký tự không phải số
            const price = parseInt(priceText.replace(/[^\d]/g, ''));

            // Hiển thị hoặc ẩn sản phẩm dựa trên giá
            if (price >= min && price <= max) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });

        // Cập nhật số lượng sản phẩm hiển thị
        updateProductCount();
    }

    // Cập nhật số lượng sản phẩm
    function updateProductCount() {
        const visibleProducts = document.querySelectorAll('.product-item:not([style*="display: none"])');
        const countElement = document.querySelector('.product-count');

        if (countElement) {
            countElement.textContent = `${visibleProducts.length} sản phẩm`;
        }
    }

    // Lắng nghe sự kiện thay đổi giá
    minPriceSlider.addEventListener('input', updatePriceDisplay);
    maxPriceSlider.addEventListener('input', updatePriceDisplay);
}

