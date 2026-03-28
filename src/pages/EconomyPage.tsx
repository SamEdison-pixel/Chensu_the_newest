import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, MapPin, Coffee, Award, DollarSign, 
  Search, Filter, ChevronRight, Heart, Share2, 
  ThumbsUp, ShoppingCart, Clock, CheckCircle
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const EconomyPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('businesses');
  const [businesses, setBusinesses] = useState<Array<{
    id: number;
    name: string;
    category: string;
    address: string;
    rating: number;
    reviews: number;
    image: string;
    discount: string;
    isCertified: boolean;
  }>>([]);
  const [crowdfundingProjects, setCrowdfundingProjects] = useState<Array<{
    id: number;
    title: string;
    description: string;
    currentFunders: number;
    targetFunders: number;
    price: number;
    image: string;
    remainingDays: number;
    isSuccess: boolean;
  }>>([]);
  const [rewards, setRewards] = useState<Array<{
    id: number;
    name: string;
    description: string;
    points: number;
    image: string;
    stock: number;
  }>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [userPoints, setUserPoints] = useState(1200);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [currentReward, setCurrentReward] = useState<number | null>(null);

  // 模拟数据
  useEffect(() => {
    // 模拟商家数据
    setBusinesses([
      {
        id: 1,
        name: "阳光咖啡馆",
        category: "餐饮",
        address: "城市中心商业区A座101",
        rating: 4.8,
        reviews: 128,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=cafe%20single%20friendly%20environment%20cozy&sign=ce3169785596017b819c64996953d071",
        discount: "单人套餐8折",
        isCertified: true
      },
      {
        id: 2,
        name: "自由书店",
        category: "文化",
        address: "文艺街区88号",
        rating: 4.7,
        reviews: 95,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=bookstore%20single%20friendly%20reading%20nook&sign=843f5c7e39881122d6d305341ce78470",
        discount: "会员日9折",
        isCertified: true
      },
      {
        id: 3,
        name: "轻健身工作室",
        category: "健身",
        address: "健康路123号",
        rating: 4.6,
        reviews: 78,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=fitness%20studio%20single%20friendly%20equipment&sign=31de02a92bc51a7eb4349e2eec74cac8",
        discount: "单次体验券7折",
        isCertified: true
      },
      {
        id: 4,
        name: "城市影院",
        category: "娱乐",
        address: "购物中心5楼",
        rating: 4.9,
        reviews: 156,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=cinema%20single%20friendly%20seating%20arrangement&sign=adf39f35198fb5097f541158f734234f",
        discount: "单人票9折，送小份爆米花",
        isCertified: true
      }
    ]);

    // 模拟众筹项目数据
    setCrowdfundingProjects([
      {
        id: 1,
        title: "15元平价单人下午茶",
        description: "为单身人士定制的平价下午茶套餐，包含咖啡+蛋糕+小食，让独处时光更加美好。",
        currentFunders: 32,
        targetFunders: 50,
        price: 15,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=affordable%20afternoon%20tea%20set%20single%20person&sign=5944230208107157a881ac97d6f7c4e7",
        remainingDays: 5,
        isSuccess: false
      },
      {
        id: 2,
        title: "单人健身月卡",
        description: "专为单身人群设计的健身月卡，无需办年卡，价格实惠，自由灵活。",
        currentFunders: 45,
        targetFunders: 40,
        price: 199,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=single%20person%20gym%20membership%20card%20fitness&sign=0603d5f7f08212d086b490f27adf7273",
        remainingDays: 3,
        isSuccess: true
      },
      {
        id: 3,
        title: "单身旅行小团",
        description: "组织小型单身旅行团，让独自旅行不再孤单，结识志同道合的朋友。",
        currentFunders: 18,
        targetFunders: 30,
        price: 399,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=single%20travel%20small%20group%20adventure&sign=c8aedf90ef7b164241406cdceefa8879",
        remainingDays: 10,
        isSuccess: false
      }
    ]);

    // 模拟积分兑换商品数据
    setRewards([
      {
        id: 1,
        name: "奶茶满减券",
        description: "指定奶茶店20元减10元优惠券，有效期30天。",
        points: 300,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=bubble%20tea%20discount%20coupon%20drink&sign=fe8fd7899a66d08749cb640410039e5e",
        stock: 50
      },
      {
        id: 2,
        name: "课程体验卡",
        description: "价值99元的心理健康课程体验卡，可任意选择一门课程。",
        points: 800,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=course%20experience%20card%20mental%20health&sign=6085b2a8cd189129302344efb69d6b28",
        stock: 20
      },
      {
        id: 3,
        name: "电影兑换券",
        description: "指定影院电影票兑换券一张，有效期45天。",
        points: 500,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=movie%20ticket%20voucher%20cinema%20experience&sign=9f8acc74ebcfa6c5cf0637d56d1b94ef",
        stock: 30
      }
    ]);
  }, []);

  // 支持众筹项目
  const handleSupportCrowdfunding = (id: number) => {
    const project = crowdfundingProjects.find(p => p.id === id);
    if (!project || project.isSuccess) return;

    setIsLoading(true);

    // 模拟支付流程
    setTimeout(() => {
      setCrowdfundingProjects(crowdfundingProjects.map(project => 
        project.id === id 
          ? { 
              ...project, 
              currentFunders: project.currentFunders + 1,
              isSuccess: project.currentFunders + 1 >= project.targetFunders
            } 
          : project
      ));
      setIsLoading(false);
      toast.success("众筹支持成功！感谢您的参与。");
    }, 1500);
  };

  // 兑换积分商品
  const handleExchangeReward = (id: number) => {
    const reward = rewards.find(r => r.id === id);
    if (!reward || reward.stock <= 0 || userPoints < reward.points) {
      if (userPoints < reward.points) {
        toast.warning("积分不足，无法兑换");
      } else {
        toast.warning("商品库存不足");
      }
      return;
    }

    setCurrentReward(id);
    setShowClaimModal(true);
  };

  // 确认兑换
  const handleConfirmExchange = () => {
    if (!currentReward) return;

    setIsLoading(true);

    // 模拟兑换流程
    setTimeout(() => {
      setRewards(rewards.map(reward => 
        reward.id === currentReward 
          ? { ...reward, stock: reward.stock - 1 } 
          : reward
      ));
      setUserPoints(userPoints - rewards.find(r => r.id === currentReward)!.points);
      setShowClaimModal(false);
      setCurrentReward(null);
      setIsLoading(false);
      toast.success("兑换成功！优惠券已发送到您的账户。");
    }, 1500);
  };

  // 过滤商家
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          business.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || business.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // 渲染星级评分
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <i 
            key={i} 
            className={`fa-solid fa-star text-sm ${i < Math.floor(rating) ? 'text-yellow-500' : theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}
          ></i>
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
                辰宿 - 单身经济板块
              </motion.div>
            </div>
            
            <div className="flex items-center">
              <div className={`flex items-center mr-4 px-4 py-2 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-gray-200' 
                  : 'bg-white text-gray-700 shadow-sm'
              }`}>
                <DollarSign size={16} className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} />
                <span className={`ml-2 font-medium ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                  {userPoints}
                </span>
                <span className={`ml-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>积分</span>
              </div>
              
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">单身经济板块</h1>
          <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            为单身人群打造的专属消费体验，消除消费歧视，享受更多优惠
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto mb-8 pb-2 gap-4">
          <button
            onClick={() => setSelectedTab('businesses')}
            className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              selectedTab === 'businesses'
                ? 'bg-purple-600 text-white shadow-md'
                : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} />
              <span>单身友好商家</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedTab('crowdfunding')}
            className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              selectedTab === 'crowdfunding'
                ? 'bg-blue-600 text-white shadow-md'
                : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            <div className="flex items-center gap-2">
              <Coffee size={18} />
              <span>众筹定制消费</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedTab('rewards')}
            className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              selectedTab === 'rewards'
                ? 'bg-green-600 text-white shadow-md'
                : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            <div className="flex items-center gap-2">
              <Award size={18} />
              <span>积分兑换</span>
            </div>
          </button>
        </div>

        {/* Tab Content */}
        {selectedTab === 'businesses' && (
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
                  placeholder="搜索商家..."
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

            {/* 商家分类标签 */}
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
                onClick={() => setActiveFilter('餐饮')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  activeFilter === '餐饮'
                    ? 'bg-blue-600 text-white'
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`}
              >
                餐饮
              </button>
              <button
                onClick={() => setActiveFilter('文化')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  activeFilter === '文化'
                    ? 'bg-green-600 text-white'
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`}
              >
                文化
              </button>
              <button
                onClick={() => setActiveFilter('健身')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  activeFilter === '健身'
                    ? 'bg-amber-600 text-white'
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`}
              >
                健身
              </button>
              <button
                onClick={() => setActiveFilter('娱乐')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  activeFilter === '娱乐'
                    ? 'bg-pink-600 text-white'
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`}
              >
                娱乐
              </button>
            </div>

            {/* 商家列表 */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBusinesses.map((business) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={business.image}
                      alt={business.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {business.isCertified && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle size={12} />
                        <span>单身友好认证</span>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      {business.discount}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      {business.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        theme === 'dark'
                          ? 'bg-purple-900/30 text-purple-400'
                          : 'bg-purple-100 text-purple-600'
                      }`}>
                        {business.category}
                      </span>
                      <div className="ml-auto">
                        {renderRating(business.rating)}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-sm line-clamp-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {business.address}
                      </span>
                    </div>
                    
                    <button className={`w-full py-2 rounded-lg font-medium transition-all ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      查看详情
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedTab === 'crowdfunding' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {crowdfundingProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {project.isSuccess && (
                      <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        众筹成功
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 md:w-2/3 relative">
                    {!project.isSuccess && (
                      <div className="absolute top-6 right-6 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Clock size={12} />
                        <span>剩余 {project.remainingDays} 天</span>
                      </div>
                    )}
                    
                    <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      {project.title}
                    </h3>
                    
                    <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {project.description}
                    </p>
                    
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-1">
                        <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>众筹进度</span>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {project.currentFunders} / {project.targetFunders} 人
                        </span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div 
                          className={`h-full rounded-full ${project.isSuccess ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-blue-500'}`} 
                          style={{ width: `${(project.currentFunders / project.targetFunders) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <DollarSign size={18} className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} />
                        <span className={`font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          ¥{project.price}
                        </span>
                      </div>
                      
                      {project.isSuccess ? (
                        <button className={`px-6 py-2 rounded-lg font-medium ${
                          theme === 'dark'
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-green-100 text-green-600'
                        } cursor-not-allowed`}>
                          立即购买
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSupportCrowdfunding(project.id)}
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
                            <span>支持众筹</span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {selectedTab === 'rewards' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {rewards.map((reward) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                    {reward.name}
                  </h3>
                  
                  <p className={`mb-4 line-clamp-3 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {reward.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1">
                      <DollarSign size={18} className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'} />
                      <span className={`font-semibold ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>
                        {reward.points} 积分
                      </span>
                    </div>
                    
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      reward.stock > 0
                        ? `${theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'}`
                        : `${theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'}`
                    }`}>
                      {reward.stock > 0 ? `库存 ${reward.stock}` : '已售罄'}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleExchangeReward(reward.id)}
                    disabled={isLoading || reward.stock <= 0 || userPoints < reward.points}
                    className={`w-full py-2 rounded-lg font-medium transition-all ${
                      (isLoading || reward.stock <= 0 || userPoints < reward.points)
                        ? `${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-500'} cursor-not-allowed`
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <span>处理中...</span>
                      </div>
                    ) : userPoints < reward.points ? (
                      <span>积分不足</span>
                    ) : reward.stock <= 0 ? (
                      <span>已售罄</span>
                    ) : (
                      <span>立即兑换</span>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
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

      {/* 兑换确认弹窗 */}
      {showClaimModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className={`w-full max-w-md p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">确认兑换</h3>
              <button
                onClick={() => {
                  setShowClaimModal(false);
                  setCurrentReward(null);
                }}
                className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            
            {currentReward && (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img
                      src={rewards.find(r => r.id === currentReward)?.image}
                      alt={rewards.find(r => r.id === currentReward)?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      {rewards.find(r => r.id === currentReward)?.name}
                    </h4>
                    <div className="flex items-center gap-1 mt-1">
                      <DollarSign size={16} className={theme === 'dark' ? 'text-amber-400' : 'text-amber-600'} />
                      <span className={`font-semibold ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>
                        {rewards.find(r => r.id === currentReward)?.points} 积分
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  您确定要使用 {rewards.find(r => r.id === currentReward)?.points} 积分兑换此商品吗？
                </p>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowClaimModal(false);
                      setCurrentReward(null);
                    }}
                    className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    取消
                  </button>
                  
                  <button
                    onClick={handleConfirmExchange}
                    disabled={isLoading}
                    className={`flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg transition-all ${
                      isLoading && 'opacity-70'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <span>兑换中...</span>
                      </div>
                    ) : (
                      <span>确认兑换</span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EconomyPage;