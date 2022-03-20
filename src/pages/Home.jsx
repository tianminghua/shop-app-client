import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { Container } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import { categories, categories2 } from "../data";
import CategoryItem from "../components/CategoryItem";
import CategoryItemshort from "../components/CategoryItemshort";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Container>
        {/* <Slider /> */}
        <Categories data={categories} component={CategoryItem} />
        <Categories data={categories2} component={CategoryItemshort} />
        <Header as='h2' textAlign='center'>
          Popular Items
        </Header>
        <Products />
        <Newsletter />
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
