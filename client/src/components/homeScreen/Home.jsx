import React from 'react';
import Banner from './Banner';
import Category from './Category';
import Featured from './Featured';
import Latest from './Latest';
import Exclusive from './Exclusive';

const Home = () => {
    return (
        <>
            <Banner />
            <Category />
            <Featured />
            <Latest />
            <Exclusive />
        </>
    )
}

export default Home;
