import React from "react";
import "./Footer.css";
import Chatbot from "./Chatbot";

function Footer() {
    return (
        <div>
            <Chatbot />
            <section className="footer">
                <h3 className="footer-title">Contact Us</h3>
                <div className="icons">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-linkedin"></i>
                </div>
            </section>
        </div>
    );
}

export default Footer;
