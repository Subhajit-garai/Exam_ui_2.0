import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-card border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-primary">Jeca</h3>
                        <p className="text-muted-foreground text-sm">
                            Empowering students to achieve their academic goals with comprehensive exam preparation tools.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/home" className="text-muted-foreground hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/test/join" className="text-muted-foreground hover:text-primary transition-colors">
                                    Exams
                                </Link>
                            </li>
                            <li>
                                <Link to="/notes/notes" className="text-muted-foreground hover:text-primary transition-colors">
                                    Notes
                                </Link>
                            </li>
                            <li>
                                <Link to="/analysis/test" className="text-muted-foreground hover:text-primary transition-colors">
                                    Analysis
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/term" className="text-muted-foreground hover:text-primary transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/refund" className="text-muted-foreground hover:text-primary transition-colors">
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Contact Us</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <MapPin size={18} className="shrink-0 mt-0.5" />
                                <span>Bankura, West Bengal 722101</span>
                            </li>
                            <li className="flex items-center gap-3 text-muted-foreground">
                                <Mail size={18} className="shrink-0" />
                                <a href="mailto:exambuddys.in@gmail.com" className="hover:text-primary transition-colors">
                                    exambuddys.in@gmail.com
                                </a>
                            </li>
                            {/* <li className="flex items-center gap-3 text-muted-foreground">
                                <Phone size={18} className="shrink-0" />
                                <span>+91 1234567890</span>
                            </li> */}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Jeca. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
