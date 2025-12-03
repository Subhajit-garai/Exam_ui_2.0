import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { IconBrandTelegram as Telegram } from '@tabler/icons-react';
// IconBrandFacebook as Facebook
export const Footer = () => {
    return (
        <footer className="bg-card border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-[var(--text-primary)]">exambuddys</h3>
                        <p className="text-[var(--text-secondary)] text-sm">
                            Empowering students to achieve their academic goals with comprehensive exam preparation tools.
                        </p>
                        <div className="flex space-x-4">
                            {/* <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                <Facebook size={20} />
                            </a> */}
                            <a href="https://web.telegram.org/a/#7057093987" target="_blank" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                <Telegram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[var(--text-primary)]">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/home" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/test/join" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    Exams
                                </Link>
                            </li>
                            <li>
                                <Link to="/notes/notes" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    Notes
                                </Link>
                            </li>
                            <li>
                                <Link to="/analysis/test" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    Analysis
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[var(--text-primary)]">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/term" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/refund" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[var(--text-primary)]">Contact Us</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                                <MapPin size={18} className="shrink-0 mt-0.5" />
                                <span>Bankura, West Bengal 722101</span>
                            </li>
                            <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                                <Mail size={18} className="shrink-0" />
                                <a href="mailto:exambuddys.in@gmail.com" className="hover:text-[var(--text-primary)] transition-colors">
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

                <div className="border-t border-border mt-12 pt-8 text-center text-sm text-[var(--text-secondary)]">
                    <p>&copy; {new Date().getFullYear()} Jeca. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
