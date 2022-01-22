import { useRouter } from 'next/router';
import React from 'react';

function Product(props) {
    const router = useRouter();
    return (
        <div>
            producto {router.query.slug}
        </div>
    );
}

export default Product;