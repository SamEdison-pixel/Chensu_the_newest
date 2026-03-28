import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, MessageCircle, Users, BookOpen, ShoppingBag, Heart, TrendingUp, Award, Users as UsersIcon, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronRight, Star, Calendar, MapPin as MapPinIcon, Clock, BookMarked, CheckCircle, AlertTriangle, Coffee, Share2, ThumbsUp, ArrowUpRight, Send, User, Filter, Search, ChevronDown } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  // Refs for scrolling to sections
  const sections = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    market: useRef<HTMLDivElement>(null),
    advantages: useRef<HTMLDivElement>(null),
    value: useRef<HTMLDivElement>(null),
   contact: useRef<HTMLDivElement>(null),
  };

  // Banner slides
  const slides = [
    {
      title: "辰宿",
      subtitle: "单身经济背景下心理健康社群平台",
      description: "让单身生活更健康、温暖且有尊严",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=young%20people%20outdoor%20relaxation%2C%20smiling%2C%20positive%20lifestyle&sign=a7e1081fd44742f8e8f6859f0cf79ef3"
    },
    {
      title: "构建温暖的生活生态系统",
      subtitle: "为单身人群提供情感支持",
      description: "打破孤独，连接心灵，共同成长",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=community%20support%20group%2C%20friends%20gathering%2C%20warm%20atmosphere&sign=c92c03de23a8b2f7e991addeccef71ea"
    },
    {
      title: "专业心理健康服务",
      subtitle: "从AI陪伴到专业咨询",
      description: "全方位守护您的心理健康",
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=mental%20health%20counseling%2C%20professional%20support%2C%20trusting%20environment&sign=f765e2612151eadb43b12d47a68c41b8"
    }
  ];

  // Market data for charts
  const marketData = [
    { name: '2015', value: 140 },
    { name: '2017', value: 220 },
    { name: '2019', value: 340 },
    { name: '2021', value: 420 },
    { name: '2022', value: 500 },
  ];
  
  const singlePopulationData = [
    { name: '18-25岁', value: 25 },
    { name: '26-35岁', value: 45 },
    { name: '36-45岁', value: 20 },
    { name: '45岁以上', value: 10 },
  ];
  
  const COLORS = ['#8b5cf6', '#60a5fa', '#34d399', '#fbbf24'];
  
   // 删除团队成员数据

  // Scroll to section
  const scrollToSection = (section: keyof typeof sections) => {
    setIsMenuOpen(false);
    sections[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto slide for banner
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={`min-h-screen font-sans antialiased ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-shrink-0 text-purple-600 dark:text-purple-400 font-bold text-xl"
              >
                辰宿
              </motion.div>
              
              {/* Desktop navigation */}
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                {Object.keys(sections).map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section as keyof typeof sections)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {section === 'home' ? '首页' : 
                     section === 'about' ? '项目介绍' : 
                     section === 'features' ? '核心功能' :
                     section === 'market' ? '市场分析' :
                     section === 'advantages' ? '竞争优势' :
                     section === 'value' ? '社会价值' : '联系方式'}
                   </button>
                 ))}
               </nav>
             </div>
             
             <div className="hidden md:flex items-center">
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {theme === 'dark' ? (
                  <i className="fa-solid fa-sun"></i>
                ) : (
                  <i className="fa-solid fa-moon"></i>
                )}
              </button>
              
              <button 
                onClick={() => window.location.href = "/community"}
                className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                立即体验
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleTheme}
                className={`p-2 mr-2 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {theme === 'dark' ? (
                  <i className="fa-solid fa-sun"></i>
                ) : (
                  <i className="fa-solid fa-moon"></i>
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isMenuOpen ? (
                  <i className="fa-solid fa-times"></i>
                ) : (
                  <i className="fa-solid fa-bars"></i>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {Object.keys(sections).map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section as keyof typeof sections)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {section === 'home' ? '首页' : 
                   section === 'about' ? '项目介绍' : 
                   section === 'features' ? '核心功能' :
                   section === 'market' ? '市场分析' :
                   section === 'advantages' ? '竞争优势' :
                    section === 'value' ? '社会价值' : '联系方式'}
                 </button>
               ))}
               
               <button 
                 onClick={() => window.location.href = "/community"}
                 className="mt-4 w-full px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-md"
               >
                 立即体验
               </button>
            </div>
          </motion.div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section 
          ref={sections.home}
          className="relative pt-16 overflow-hidden"
        >
          <motion.div 
            style={{ opacity }}
            className="absolute inset-0 z-0"
          >
            {/* Slider */}
            <div className="relative h-[calc(100vh-4rem)]">
              {slides.map((slide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeSlide === index ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  className={`absolute inset-0 ${activeSlide === index ? 'block' : 'hidden'}`}
                >
                  <div className="absolute inset-0 bg-black/40 z-10"></div>
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
              
              {/* Slider controls */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      activeSlide === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-4rem)] flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl text-white"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{slides[activeSlide].title}</h1>
              <p className="text-xl md:text-2xl font-semibold mb-6">{slides[activeSlide].subtitle}</p>
              <p className="text-lg md:text-xl mb-8">{slides[activeSlide].description}</p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => window.location.href = "/community"}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  立即体验
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="px-8 py-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/40 font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  了解更多
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white"
          >
            <i className="fa-solid fa-chevron-down text-2xl"></i>
          </motion.div>
        </section>

        {/* About Section */}
        <section 
          ref={sections.about}
          className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">项目介绍</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative">
                  <img 
                    src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=single%20lifestyle%20positive%20vibes%20modern%20living&sign=650c0f56bd0f4bb4d0b23a158ba062e6" 
                    alt="单身经济背景" 
                    className="rounded-2xl shadow-xl w-full h-auto"
                  />
                  <div className={`absolute -bottom-6 -right-6 p-4 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold text-purple-500">2.4亿</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>中国单身人口</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-2xl font-semibold mb-6">单身经济时代的心理健康守护者</h3>
                <p className={`mb-4 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  在当今社会，单身经济蓬勃发展，越来越多的人选择单身生活方式。然而，单身人群面临着独特的心理健康挑战，包括孤独感、社交压力和自我认同等问题。
                </p>
                <p className={`mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  辰宿应运而生，致力于为单身人群提供心理健康支持和社交陪伴，构建一个温暖且有归属感的生活生态系统。我们通过创新的AI技术和社群运营模式，让每一位单身人士都能获得专业的心理支持和情感共鸣。
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="p-2 bg-purple-500 rounded-lg text-white">
                        <Users size={18} />
                      </div>
                      <div className="font-medium">2.4亿+</div>
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>中国单身人口</div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="p-2 bg-blue-500 rounded-lg text-white">
                        <Heart size={18} />
                      </div>
                      <div className="font-medium">2.1%</div>
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>抑郁症患病率</div>
                  </div>
                </div>
                
                <button 
                  onClick={() => scrollToSection('features')}
                  className="flex items-center space-x-2 font-medium text-purple-600 dark:text-purple-400"
                >
                  <span>探索我们的解决方案</span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section 
          ref={sections.features}
          className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">核心功能</h2>
              <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                我们提供全方位的心理健康支持和社交服务，满足单身人群的多元化需求
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className="w-14 h-14 mb-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <MessageCircle size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">情感共鸣社区</h3>
                <ul className={`space-y-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mt-1 mr-2"></i>
                    <span>匿名树洞与AI情绪预警</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mt-1 mr-2"></i>
                    <span>孤勇者故事集专栏</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mt-1 mr-2"></i>
                    <span>社区守护者机制</span>
                  </li>
                </ul>
                <button 
                  onClick={() => window.location.href = "/community"}
                  className="mt-6 px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors w-full"
                >
                  立即体验
                </button>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className="w-14 h-14 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">线下活动社群</h3>
                <ul className={`space-y-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mt-1 mr-2"></i>
                    <span>轻量化兴趣匹配与低门槛活动</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mt-1 mr-2"></i>
                    <span>线上破冰场景设计</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mt-1 mr-2"></i>
                    <span>社交信用分体系</span>
                  </li>
                </ul>
                <button 
                  onClick={() => window.location.href = "/events"}
                  className="mt-6 px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors w-full"
                >
                  立即加入
                </button>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className="w-14 h-14 mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">专业课程与咨询</h3>
                <ul className={`space-y-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mt-1 mr-2"></i>
                    <span>阶梯式支持体系</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mt-1 mr-2"></i>
                    <span>5分钟正念胶囊课程</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mt-1 mr-2"></i>
                    <span>匿名情绪盲盒功能</span>
                  </li>
                </ul>
                <button 
                  onClick={() => window.location.href = "/courses"}
                  className="mt-6 px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors w-full"
                >
                  立即学习
                </button>
              </motion.div>
              
              {/* Feature 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className="w-14 h-14 mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <ShoppingBag size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">单身经济板块</h3>
                <ul className={`space-y-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mt-1 mr-2"></i>
                    <span>消除单身消费隐形歧视</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mt-1 mr-2"></i>
                    <span>大众监督机制与反向众筹</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mt-1 mr-2"></i>
                    <span>积分体系与独居福利日</span>
                  </li>
                </ul>
                <button 
                  onClick={() => window.location.href = "/economy"}
                  className="mt-6 px-4 py-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-medium hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors w-full"
                >
                  立即探索
                </button>
              </motion.div>
            </div>
            
            {/* Feature details */}
            <div className="mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid md:grid-cols-2 gap-16 items-center mb-24"
              >
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-semibold mb-6">情感共鸣社区</h3>
                  <p className={`mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    我们提供安全的匿名树洞空间，让用户可以自由表达情绪和分享生活压力。AI系统会实时扫描关键词，触发分级响应机制，为用户提供适当的支持和干预。
                  </p>
                  <p className={`mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    "孤勇者故事集"专栏邀请用户分享非婚生活经验，打破社会对单身人群的刻板印象，降低心理病耻感。我们还建立了社区守护者机制，由心理学背景的用户担任，确保社区环境的健康与安全。
                  </p>
                  <button 
                    onClick={() => window.location.href = "/community"}
                    className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                  >
                    <span>立即体验情感共鸣社区</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
                <div className="order-1 md:order-2">
                  <img 
                    src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=online%20community%20support%2C%20emotional%20connection%2C%20anonymous%20sharing&sign=6389bbb553f60fd1b84026c2d1e320b9" 
                    alt="情感共鸣社区" 
                    className="rounded-2xl shadow-xl w-full h-auto"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid md:grid-cols-2 gap-16 items-center"
              >
                <div>
                  <img 
                    src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=community%20activities%2C%20social%20gathering%2C%20single%20people%20connecting&sign=437a15429e497cd256a7e9f604a26114" 
                    alt="线下活动社群" 
                    className="rounded-2xl shadow-xl w-full h-auto"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-6">线下活动社群</h3>
                  <p className={`mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    我们通过智能算法推荐契合度高的社群，帮助用户找到志同道合的朋友。线上破冰场景设计和线下"轻压力"活动模式，让社交变得更加轻松自然。
                  </p>
                  <p className={`mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    社交信用分体系激励用户积极参与社区活动，高信用者可获得各种福利和特权。我们致力于构建真实、健康的社交网络，让单身生活更加丰富多彩。
                  </p>
                  <button 
                    onClick={() => window.location.href = "/events"}
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <span>立即加入线下活动社群</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Market Analysis Section */}
        <section 
          ref={sections.market}
          className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">市场分析</h2>
              <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                单身经济与心理健康市场潜力巨大，辰宿正处于行业发展的黄金机遇期
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-2xl font-semibold mb-6">市场现状与发展趋势</h3>
                <ul className={`space-y-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 mt-1 mr-4">
                      <Users size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">单身人群规模扩大</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        2022年我国单身人口规模已达2.4亿，占总人口约17%，其中20-39岁的适婚年龄单身人群超过1亿。
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 mt-1 mr-4">
                      <Heart size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">心理健康危机加剧</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        我国抑郁症患病率达2.1%，焦虑障碍患病率达4.98%，其中20-35岁都市白领是高风险人群。
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400 mt-1 mr-4">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">健康消费升级</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        中国心理健康服务市场规模已从2015年的140亿元增长至2022年的500亿元，年复合增长率达20%。
                      </p>
                    </div>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
              >
                <h4 className="text-lg font-medium mb-6">中国心理健康服务市场规模（单位：亿元）</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={marketData}>
                    <XAxis dataKey="name" stroke={theme === 'dark' ? '#cbd5e1' : '#475569'} />
                    <YAxis stroke={theme === 'dark' ? '#cbd5e1' : '#475569'} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                        color: theme === 'dark' ? '#cbd5e1' : '#475569',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="mt-8">
                  <h4 className="text-lg font-medium mb-6">单身人口年龄分布</h4>
                  <div className="flex justify-center">
                    <ResponsiveContainer width="80%" height={200}>
                      <PieChart>
                        <Pie
                          data={singlePopulationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {singlePopulationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                            color: theme === 'dark' ? '#cbd5e1' : '#475569',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                          }} 
                          formatter={(value) => [`${value}%`, '占比']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center"
            >
              <h3 className="text-2xl font-semibold mb-6">发展契机</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}>
                  <div className="text-purple-600 dark:text-purple-400 mb-4">
                    <i className="fa-solid fa-chart-line text-3xl"></i>
                  </div>
                  <h4 className="text-lg font-medium mb-3">蓝海市场</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    单身经济+心理健康赛道仍处于蓝海，目前市场上专门针对单身人群的心理健康社群平台较少。
                  </p>
                </div>
                
                <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}>
                  <div className="text-blue-600 dark:text-blue-400 mb-4">
                    <i className="fa-solid fa-robot text-3xl"></i>
                  </div>
                  <h4 className="text-lg font-medium mb-3">技术赋能</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    AI+大数据精准匹配技术可有效降低服务成本，提高社交质量，为用户提供个性化体验。
                  </p>
                </div>
                
                <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}>
                  <div className="text-green-600 dark:text-green-400 mb-4">
                    <i className="fa-solid fa-hand-holding-dollar text-3xl"></i>
                  </div>
                  <h4 className="text-lg font-medium mb-3">商业模式创新</h4>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    订阅制+增值服务的多元化变现模式，结合品牌合作和企业B端服务，形成可持续的盈利体系。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Competitive Advantages Section */}
        <section 
          ref={sections.advantages}
          className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">竞争优势</h2>
              <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                辰宿在产品设计、运营模式、商业模式和社会价值方面具有显著优势
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4">
                    <Award size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold">产品设计优势</h3>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  构建了"社群化心理支持+轻量化心理咨询+AI精准匹配"的独特模式，通过情绪树洞、同伴支持系统、即时倾诉功能、心理自助工具包等特色功能，既满足情感陪伴需求，又提供专业心理支持。
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                    <UsersIcon size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold">运营模式优势</h3>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  采用社交裂变增长策略降低获客成本，通过每日打卡、主题讨论等活动增强用户粘性，并运用数据分析提供个性化体验，显著提升了用户留存率。
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
                    <ShoppingBag size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold">商业模式优势</h3>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  设计了多元变现路径，包括订阅会员制、增值服务、品牌合作和企业B端服务，形成可持续的盈利体系，确保平台的长期稳定发展。
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mr-4">
                    <Heart size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold">社会价值优势</h3>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  能够有效应对单身社会带来的心理健康挑战，降低抑郁、焦虑等心理问题的发生率，构建新型数字社交网络，为流动性强的单身人群提供情感归属，促进社会包容性发展。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Value Section */}
        <section 
          ref={sections.value}
          className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">社会价值</h2>
              <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                辰宿不仅是一个商业平台，更是一个具有深远社会意义的项目
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white">
                  <Heart size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">心理健康层面</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-center leading-relaxed`}>
                  降低心理健康服务门槛，让更多单身人群能够获得专业的心理支持和陪伴，减少心理问题的发生，提升整体心理健康水平。
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">社会认知层面</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-center leading-relaxed`}>
                  通过"孤勇者故事集"等UGC内容，展示单身生活的多样性与价值，打破"婚姻是唯一幸福路径"的传统叙事，推动社会认知变革。
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white">
                  <TrendingUp size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">经济发展层面</h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-center leading-relaxed`}>
                  激活单身经济新生态，引领消费升级，与餐饮、旅游、健身等商家的跨界合作可拓展消费场景，形成更完整的商业生态。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

         {/* 删除团队介绍部分，保留其他部分 */}

        {/* Contact Section */}
        <section 
          ref={sections.contact}
          className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">联系我们</h2>
              <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                如有任何问题或合作意向，请随时与我们联系
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg h-full`}>
                  <h3 className="text-2xl font-semibold mb-8">联系方式</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 mr-4">
                        <Phone size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">电话</h4>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>16629097618</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 mr-4">
                        <Mail size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">邮箱</h4>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>cestbon_258@qq.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 mr-4">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">地址</h4>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>天津财经大学珠江学院</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h4 className="font-medium mb-4">关注我们</h4>
                    <div className="flex space-x-4">
                      <a href="#" className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                        <Facebook size={20} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
                      </a>
                      <a href="#" className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                        <Twitter size={20} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
                      </a>
                      <a href="#" className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                        <Instagram size={20} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
                      </a>
                      <a href="#" className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                        <Linkedin size={20} className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} shadow-lg`}>
                  <h3 className="text-2xl font-semibold mb-6">留言咨询</h3>
                  
                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div><label htmlFor="name" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          姓名
                        </label>
                        <input
                          type="text"
                          id="name"
                          className={`w-full px-4 py-3 rounded-lg ${
                            theme === 'dark' 
                              ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          } border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                          placeholder="请输入您的姓名"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          邮箱
                        </label>
                        <input
                          type="email"
                          id="email"
                          className={`w-full px-4 py-3 rounded-lg ${
                            theme === 'dark' 
                              ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          } border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                          placeholder="请输入您的邮箱"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        主题
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className={`w-full px-4 py-3 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                        placeholder="请输入咨询主题"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        留言内容
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className={`w-full px-4 py-3 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                        placeholder="请输入您的留言内容"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                      提交留言
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">让单身生活更健康、温暖且有尊严</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                加入辰宿，一起构建温暖的单身生活生态系统，探索更多可能
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => window.location.href = "/community"}
                  className="px-8 py-3 rounded-full bg-white text-purple-600 font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  立即体验
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 rounded-full bg-transparent border border-white text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  联系我们
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">辰宿</div>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                致力于为单身人群提供心理健康支持和社交陪伴，构建温暖且有归属感的生活生态系统。
              </p>
              <div className="flex space-x-4">
                <a href="#" className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'} transition-colors`}>
                  <Facebook size={18} />
                </a>
                <a href="#" className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'} transition-colors`}>
                  <Twitter size={18} />
                </a>
                <a href="#" className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'} transition-colors`}>
                  <Instagram size={18} />
                </a>
                <a href="#" className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'} transition-colors`}>
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">产品</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>情感共鸣社区</a>
                </li>
                <li>
                  <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>线下活动社群</a>
                </li>
                <li>
                  <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>专业课程与咨询</a>
                </li>
                <li>
                  <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>单身经济板块</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">关于我们</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>项目介绍</a>
                </li>
                <li>
                  <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>团队介绍</a>
                </li>
                <li>
                  <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>新闻动态</a>
                </li>
                <li>
                  <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>加入我们</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">支持</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>帮助中心</a>
                </li>
                <li>
                  <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>联系我们</a>
                </li>
                <li>
                  <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>隐私政策</a>
                </li>
                <li>
                  <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>服务条款</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className={`pt-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} text-center`}>
            <p className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
              &copy; {new Date().getFullYear()} 辰宿 - 单身经济背景下心理健康社群平台. 保留所有权利.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;