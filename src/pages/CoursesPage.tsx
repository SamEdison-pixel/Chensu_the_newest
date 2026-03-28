import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Clock, DollarSign, Users, Calendar, 
  Star, Award, Search, Filter, ChevronRight, User,
  CheckCircle, BookMarked, Play, ShoppingCart, Heart
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CoursesPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('courses');
  const [courses, setCourses] = useState<Array<{
    id: number;
    title: string;
    description: string;
    duration: string;
    price: number;
    rating: number;
    students: number;
    image: string;
    category: string;
    isPurchased: boolean;
  }>>([]);
  const [counselors, setCounselors] = useState<Array<{id: number;
    name: string;
    title: string;
    specialty: string[];
    rating: number;
    sessions: number;
    image: string;
    price: number;
  }>>([]);
  const [learningHistory, setLearningHistory] = useState<Array<{
    id: number;
    courseTitle: string;
    progress: number;
    lastStudied: string;
    image: string;
  }>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentCounselor, setCurrentCounselor] = useState<number | null>(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    issue: ''
  });

  // 模拟数据
  useEffect(() => {
    // 模拟课程数据
    setCourses([
      {
        id: 1,
        title: "5分钟正念胶囊课程",
        description: "每天5分钟，帮助你在忙碌的生活中找到内心的平静，缓解压力和焦虑。",
        duration: "3周",
        price: 99,
        rating: 4.8,
        students: 1245,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=mindfulness%20meditation%20course%20peaceful%20mind&sign=80ba259061eab6486dbf7db36628b50d",
        category: "冥想",
        isPurchased: false
      },
      {
        id: 2,
        title: "独居生存课",
        description: "学习如何打造舒适的独居环境，管理个人财务，保持身心健康的生活方式。",
        duration: "4周",
        price: 129,
        rating: 4.6,
        students: 897,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=living%20alone%20skills%20course%20self%20improvement&sign=7ce8dae0a2c79a12387dc6e901eaed98",
        category: "生活技能",
        isPurchased: false
      },
      {
        id: 3,
        title: "情绪管理与自我调节",
        description: "了解情绪产生的机制，学习有效的情绪管理技巧，提升心理韧性。",
        duration: "6周",
        price: 199,
        rating: 4.9,
        students: 1567,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=emotion%20management%20course%20self%20regulation&sign=2a73a4292a74093691cd198e9ed1fe88",
        category: "心理",
        isPurchased: false
      },
      {
        id: 4,
        title: "高效社交技巧训练",
        description: "提升你的社交能力，学习如何建立健康的人际关系，增强沟通自信。",
        duration: "5周",
        price: 159,
        rating: 4.7,
        students: 1123,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=social%20skills%20training%20effective%20communication&sign=757561fdd9999854dde8e8da41a1e2e0",
        category: "社交",
        isPurchased: false
      }
    ]);

    // 模拟心理咨询师数据
    setCounselors([
      {
        id: 1,
        name: "张明",
        title: "资深心理咨询师",
        specialty: ["抑郁症", "焦虑障碍", "压力管理"],
        rating: 4.9,
        sessions: 1200,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=mental%20health%20counselor%20professional%20male&sign=d1502c5f603e2e25ca176fcb0713d92a",
        price: 300
      },
      {
        id: 2,
        name: "李婷",
        title: "婚姻家庭咨询师",
        specialty: ["亲密关系", "家庭矛盾", "自我成长"],
        rating: 4.8,
        sessions: 950,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=marriage%20counselor%20professional%20female&sign=2614f996c4db868fb5023ac06ed1e299",
        price: 350
      },
      {
        id: 3,
        name: "王强",
        title: "职业心理咨询师",
        specialty: ["职业压力", "职业规划", "职场人际关系"],
        rating: 4.7,
        sessions: 850,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=career%20counselor%20professional%20male&sign=3f220d122e6fe7483c6eea67e08d124d",
        price: 280
      }
    ]);

    // 模拟学习记录数据
    setLearningHistory([
      {
        id: 1,
        courseTitle: "心理健康基础课",
        progress: 65,
        lastStudied: "昨天",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=mental%20health%20basics%20course%20study&sign=a450adbb8f4d08561815798063cde86d"
      },
      {
        id: 2,
        courseTitle: "认知行为疗法入门",
        progress: 30,
        lastStudied: "3天前",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=cognitive%20behavioral%20therapy%20course%20study&sign=076436b1eabf6717549440448cd0fa6e"
      }
    ]);
  }, []);

  // 购买课程
  const handlePurchaseCourse = (id: number) => {
    setIsLoading(true);

    // 模拟支付流程
    setTimeout(() => {
      setCourses(courses.map(course => 
        course.id === id 
          ? { ...course, isPurchased: true } 
          : course
      ));
      setIsLoading(false);
      toast.success("课程购买成功！");
    }, 1500);
  };

  // 预约咨询
  const handleBookConsultation = (id: number) => {
    setCurrentCounselor(id);
    setShowBookingForm(true);
  };

  // 提交预约表单
  const handleSubmitBooking = () => {
    // 表单验证
    if (!bookingData.name || !bookingData.phone || !bookingData.email || !bookingData.date || !bookingData.time || !bookingData.issue) {
      toast.warning("请填写完整的预约信息");
      return;
    }

    // 简单的邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
      toast.warning("请输入有效的邮箱地址");
      return;
    }

    setIsLoading(true);

    // 模拟API请求延迟
    setTimeout(() => {
      setShowBookingForm(false);
      setBookingData({ name: '', phone: '', email: '', date: '', time: '', issue: '' });
      setIsLoading(false);
      toast.success("咨询预约成功！我们会尽快与您确认。");
    }, 1500);
  };

  // 过滤课程
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || course.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // 渲染星级评分
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            fill={i < Math.floor(rating) ? '#fbbf24' : 'none'} 
            color={i < Math.floor(rating) ? '#fbbf24' : theme === 'dark' ? '#9ca3af' : '#d1d5db'} 
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className={`min-h-screen font-sans antialiased ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <header className="sticky top-0 z-50 transition-all duration-300 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-shrink-0 text-purple-600 dark:text-purple-400 font-bold text-xl"
              >
                辰宿 - 专业课程与咨询
              </motion.div>
            </div>
            
            <div className="flex items-center">
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
                onClick={() => navigate('/')}
                className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                返回首页
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">专业课程与咨询</h1>
          <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            通过专业的心理课程和咨询服务，提升心理健康水平，实现自我成长
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto mb-8 pb-2 gap-4">
          <button
            onClick={() => setSelectedTab('courses')}
            className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              selectedTab === 'courses'
                ? 'bg-purple-600 text-white shadow-md'
                : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={18} />
              <span>心理课程</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedTab('counseling')}
            className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              selectedTab === 'counseling'
                ? 'bg-blue-600 text-white shadow-md'
                : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>咨询服务</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedTab('learning')}
            className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              selectedTab === 'learning'
                ? 'bg-green-600 text-white shadow-md'
                : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            <div className="flex items-center gap-2">
              <BookMarked size={18} />
              <span>学习记录</span>
            </div>
          </button>
        </div>

        {/* Tab Content */}
        {selectedTab === 'courses' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 搜索和过滤 */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className={`relative flex-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md overflow-hidden`}>
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索课程..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-white placeholder-gray-400'
                      : 'bg-white text-gray-900 placeholder-gray-500'
                  } border-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                />
              </div>
              
              <div className="relative">
                <button
                  onClick={() => {
                    // 这里可以实现更复杂的过滤面板
                    toast.info("过滤功能开发中，敬请期待！");
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } shadow-md transition-colors`}
                >
                  <Filter size={18} />
                  <span>筛选</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* 课程分类标签 */}
            <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  activeFilter === 'all'
                    ? 'bg-purple-600 text-white'
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setActiveFilter('冥想')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  activeFilter === '冥想'
                    ? 'bg-blue-600 text-white'
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`}
              >
                冥想
              </button>
              <button
                onClick={() => setActiveFilter('心理')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  activeFilter === '心理'
                    ? 'bg-green-600 text-white'
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`}
              >
                心理
              </button>
              <button
                onClick={() => setActiveFilter('生活技能')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  activeFilter === '生活技能'
                    ? 'bg-amber-600 text-white'
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`}
              >
                生活技能
              </button>
              <button
                onClick={() => setActiveFilter('社交')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  activeFilter === '社交'
                    ? 'bg-pink-600 text-white'
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`}
              >
                社交
              </button>
            </div>

            {/* 课程列表 */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {course.isPurchased && (
                      <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        已购买
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`text-lg font-semibold line-clamp-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        {course.title}
                      </h3>
                    </div>
                    
                    <p className={`mb-4 line-clamp-3 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {course.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          课程时长：{course.duration}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {course.students} 人学习
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Star size={16} className="text-yellow-500" fill="#fbbf24" />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {renderRating(course.rating)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <DollarSign size={16} className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} />
                        <span className={`font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          ¥{course.price}
                        </span>
                      </div>
                      
                      {course.isPurchased ? (
                        <button className={`px-4 py-2 rounded-lg text-sm ${
                          theme === 'dark'
                            ? 'bg-green-900/30 text-green-400 hover:bg-green-800/50'
                            : 'bg-green-100 text-green-600 hover:bg-green-200'
                        } transition-colors flex items-center gap-1`}>
                          <Play size={16} />
                          <span>继续学习</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePurchaseCourse(course.id)}
                          disabled={isLoading}
                          className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            isLoading
                              ? `${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-500'} cursor-not-allowed`
                              : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
                          } flex items-center gap-1`}
                        >
                          {isLoading ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            <ShoppingCart size={16} />
                          )}
                          <span>立即购买</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedTab === 'counseling' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {counselors.map((counselor) => (
              <motion.div
                key={counselor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className="md:flex">
                  <div className="md:w-1/4 h-48 md:h-auto">
                    <img
                      src={counselor.image}
                      alt={counselor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6 md:w-3/4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {counselor.specialty.map((spec, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs ${
                            theme === 'dark'
                              ? 'bg-purple-900/30 text-purple-400'
                              : 'bg-purple-100 text-purple-600'
                          }`}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                          {counselor.name}
                        </h3>
                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{counselor.title}</p>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <DollarSign size={18} className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} />
                        <span className={`font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          ¥{counselor.price}/次
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <Star size={18} className="text-yellow-500" fill="#fbbf24" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                            {counselor.rating.toFixed(1)}
                          </span>
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            ({counselor.sessions}次咨询)
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <Award size={18} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                        </div>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          国家二级心理咨询师，10年以上咨询经验
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleBookConsultation(counselor.id)}
                      disabled={isLoading}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        isLoading
                          ? `${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-500'} cursor-not-allowed`
                          : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-spinner fa-spin"></i>
                          <span>处理中...</span>
                        </div>
                      ) : (
                        <span>预约咨询</span>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {selectedTab === 'learning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {learningHistory.length > 0 ? (
              learningHistory.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex">
                    <div className="w-24 h-24">
                      <img
                        src={item.image}
                        alt={item.courseTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 p-4">
                      <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        {item.courseTitle}
                      </h3>
                      
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>学习进度</span>
                          <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.progress}%</span>
                        </div>
                        <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500" 
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          最后学习：{item.lastStudied}
                        </span>
                        
                        <button className={`px-4 py-1.5 rounded-lg text-sm ${
                          theme === 'dark'
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-colors flex items-center gap-1`}>
                          <Play size={14} />
                          <span>继续学习</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className={`p-10 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                  <BookMarked size={36} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                  暂无学习记录
                </h3>
                <p className={`mb-6 max-w-md mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  您还没有任何学习记录，快去浏览课程并开始学习吧！
                </p>
                <button
                  onClick={() => setSelectedTab('courses')}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg transition-all"
                >
                  浏览课程
                </button>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className={`py-8 mt-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} 辰宿 - 让单身生活更健康、温暖且有尊严
          </p>
        </div>
      </footer>

      {/* 预约咨询表单弹窗 */}
      {showBookingForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className={`w-full max-w-md p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">预约心理咨询</h3>
              <button
                onClick={() => {
                  setShowBookingForm(false);
                  setBookingData({ name: '', phone: '', email: '', date: '', time: '', issue: '' });
                }}
                className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              请填写以下信息，预约心理咨询服务。我们会尽快与您确认详情。
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="booking-name" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  姓名
                </label>
                <input
                  type="text"
                  id="booking-name"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                  placeholder="请输入您的姓名"
                />
              </div>
              
              <div><label htmlFor="booking-phone" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  手机号码
                </label>
                <input
                  type="tel"
                  id="booking-phone"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                  placeholder="请输入您的手机号码"
                />
              </div>
              
              <div>
                <label htmlFor="booking-email" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  邮箱地址
                </label>
                <input
                  type="email"
                  id="booking-email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                  placeholder="请输入您的邮箱地址"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-date" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    预约日期
                  </label>
                  <input
                    type="date"
                    id="booking-date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                  />
                </div>
                
                <div>
                  <label htmlFor="booking-time" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    预约时间
                  </label>
                  <input
                    type="time"
                    id="booking-time"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="booking-issue" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  咨询问题简述
                </label>
                <textarea
                  id="booking-issue"
                  rows={3}
                  value={bookingData.issue}
                  onChange={(e) => setBookingData({ ...bookingData, issue: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none`}
                  placeholder="请简要描述您想咨询的问题..."
                ></textarea>
              </div>
            </div>
            
            <button
              onClick={handleSubmitBooking}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg transition-all ${
                isLoading && 'opacity-70'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  <span>提交中...</span>
                </div>
              ) : (
                <span>提交预约</span>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CoursesPage;