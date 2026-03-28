import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Calendar, MapPin, Clock, Heart, 
  Search, Filter, ChevronRight, User, CheckCircle,
  Award, Coffee, Map, ShoppingBag, X, ExternalLink, Share2
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('communities');
  const [communities, setCommunities] = useState<Array<{
    id: number;
    name: string;
    members: number;
    description: string;
    tags: string[];
    image: string;
    isJoined: boolean;
  }>>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Array<{
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    participants: number;
    maxParticipants: number;
    image: string;
    category: string;
  }>>([]);
  const [pastEvents, setPastEvents] = useState<Array<{
    id: number;
    title: string;
    date: string;
    image: string;
    participants: number;
    feedbackCount: number;
    content: string;
  }>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [currentCommunity, setCurrentCommunity] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // 模拟数据
  useEffect(() => {
    // 模拟社群数据
    setCommunities([
      {
        id: 1,
        name: "户外探险社群",
        members: 324,
        description: "喜欢大自然，热爱户外活动的朋友集合啦！定期组织徒步、登山、露营等活动。",
        tags: ["户外", "运动", "自然"],
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=outdoor%20adventure%20group%20hiking%20mountains&sign=e5432c0edfd0e2a746516498f43aa49e",
        isJoined: false
      },
      {
        id: 2,
        name: "哲学讨论社群",
        members: 189,
        description: "探讨人生意义，分享哲学思考。无论你是哲学爱好者还是初学者，都能在这里找到共鸣。",
        tags: ["哲学", "思考", "交流"],
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=philosophy%20discussion%20group%20people%20talking&sign=0ee55fa0e7b093a8e9cdff51e3f23a69",
        isJoined: false
      },
      {
        id: 3,
        name: "美食探店社群",
        members: 456,
        description: "寻找城市里的美食宝藏，一起品尝各种特色美食，分享美食攻略。",
        tags: ["美食", "探店", "分享"],
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=food%20exploration%20group%20trying%20local%20food&sign=4c473c6dd787ccaaba331fb369c0e87e",
        isJoined: false
      },
      {
        id: 4,
        name: "电影爱好者社群",
        members: 278,
        description: "热爱电影的朋友看过来！定期组织电影赏析、影评交流，发现更多好电影。",
        tags: ["电影", "艺术", "赏析"],
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=movie%20lovers%20group%20watching%20film&sign=da2f1c7efafbf061ad8ea51479fd1fa4",
        isJoined: false
      }
    ]);

    // 模拟即将举行的活动数据
    setUpcomingEvents([
      {
        id: 1,
        title: "城市徒步探索",
        date: "2026年2月15日",
        time: "14:00-17:00",
        location: "城市中央公园",
        participants: 28,
        maxParticipants: 50,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=urban%20hiking%20activity%20group%20walking%20city&sign=4e702075f0ab2a2c4d493264b7d0afa5",
        category: "户外"
      },
      {
        id: 2,
        title: "蒙面电影夜",
        date: "2026年2月20日",
        time: "19:00-22:00",
        location: "光影咖啡馆",
        participants: 15,
        maxParticipants: 30,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=movie%20night%20event%20people%20watching%20film%20cafe&sign=d4e12844f32909b84d73a076033a3c2f",
        category: "文化"
      },
      {
        id: 3,
        title: "心灵成长工作坊",
        date: "2026年2月25日",
        time: "10:00-16:00",
        location: "心灵空间工作室",
        participants: 12,
        maxParticipants: 20,
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=personal%20growth%20workshop%20group%20activity&sign=4ac00e6dc50752588875e981b7e02373",
        category: "心理"
      }
    ]);

    // 模拟过往活动数据 - 新增2个活动回顾，并添加内容
    setPastEvents([
      {
        id: 1,
        title: "新年茶话会",
        date: "2026年1月1日",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=new%20year%20tea%20party%20friends%20gathering&sign=b1cc10640741c200cc04bbeab6ce8776",
        participants: 36,
        feedbackCount: 28,
        content: "2026年新年第一天，我们举办了一场温馨的茶话会。来自不同行业、不同背景的单身朋友们齐聚一堂，分享过去一年的收获和感悟，展望新的一年的目标和计划。\n\n活动现场布置得温馨而有节日气氛，我们准备了各种茶点和饮品。大家围坐在一起，边吃边聊，气氛轻松而愉快。很多朋友分享了自己在辰宿平台上的经历和收获，表达了对这个社区的感谢。\n\n活动中，我们还组织了一些互动小游戏，让大家有更多的机会相互了解和交流。很多朋友在活动中找到了志同道合的人，甚至约定了后续的活动安排。\n\n这次茶话会不仅让大家度过了一个愉快的新年第一天，也加强了社区成员之间的联系和凝聚力。我们相信，在新的一年里，辰宿社区会变得更加温暖和有活力。"
      },
      {
        id: 2,
        title: "读书会：孤独的力量",
        date: "2026年1月15日",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=book%20club%20reading%20discussion%20group&sign=562e988d278e175c5a0c7f948ba3d849",
        participants: 24,
        feedbackCount: 20,
        content: "1月15日，我们举办了一场主题为'孤独的力量'的读书会。活动吸引了24位热爱阅读的单身朋友参加，大家一起分享了自己喜欢的关于孤独、独处的书籍和文章，探讨了如何在独处中找到力量和成长。\n\n活动开始时，每个人都简单介绍了自己带来的书籍，并分享了这本书对自己的影响。然后，我们分成小组进行深入的讨论，分享自己对孤独的理解和体验。很多朋友都表示，通过这次读书会，他们对孤独有了新的认识，不再把孤独视为一种负面的状态，而是看作一种自我成长和探索的机会。\n\n活动结束后，很多朋友都表示希望以后能多举办这样的读书会。我们也计划在未来推出更多主题的读书会，为喜欢阅读的朋友提供一个交流和分享的平台。"
      },
      {
        id: 3,
        title: "户外徒步活动",
        date: "2026年1月22日",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=outdoor%20hiking%20activity%20group%20nature&sign=3c26534cccb5ba930bc902b7fa3ac17e",
        participants: 42,
        feedbackCount: 38,
        content: "1月22日，我们组织了一场户外徒步活动，目的地是城市近郊的一座小山。活动吸引了42位喜欢户外活动的朋友参加，大家一起在大自然中放松身心，结交新朋友。\n\n当天天气晴朗，阳光明媚，非常适合户外活动。我们早上9点集合，然后一起出发徒步。一路上，大家有说有笑，互相帮助，气氛非常融洽。很多平时不太运动的朋友在大家的鼓励下，也坚持走完了全程。\n\n到达山顶后，我们欣赏了美丽的风景，合影留念，然后在山顶野餐。大家分享了自己带来的食物，交流了各自的生活和工作。很多朋友表示，这次徒步活动不仅让他们锻炼了身体，也让他们认识了很多志同道合的朋友。\n\n下午4点左右，我们开始下山，结束了一天的徒步活动。很多朋友都表示，希望以后能多举办这样的户外活动，让大家有更多的机会走到户外，亲近自然，结交朋友。"
      },
      {
        id: 4,
        title: "手工工作坊：制作香薰蜡烛",
        date: "2026年1月29日",
        image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=workshop%20making%20scented%20candles%20group%20activity&sign=42713cb32a0178dd9cbdfe2244d29110",
        participants: 18,
        feedbackCount: 18,
        content: "1月29日，我们举办了一场手工工作坊，主题是制作香薰蜡烛。活动吸引了18位对手工制作感兴趣的朋友参加，大家在专业老师的指导下，亲手制作了属于自己的香薰蜡烛。\n\n活动开始前，我们准备了各种制作香薰蜡烛的材料和工具，包括蜡烛蜡、精油、模具、烛芯等。专业老师首先讲解了制作香薰蜡烛的基本步骤和注意事项，然后大家开始动手制作。\n\n在制作过程中，大家都非常专注和认真，发挥自己的创意，制作出了各种形状和香味的蜡烛。很多朋友表示，这是他们第一次制作香薰蜡烛，虽然过程有些复杂，但看到自己亲手制作的成品，感到非常有成就感。\n\n活动结束后，每个人都带着自己制作的香薰蜡烛离开了。很多朋友表示，这次手工工作坊不仅让他们学会了一项新技能，也让他们度过了一个愉快而充实的下午。我们也计划在未来推出更多不同主题的手工工作坊，为喜欢手工制作的朋友提供一个交流和学习的平台。"
      }
    ]);
  }, []);

  // 加入社群
  const handleJoinCommunity = (id: number) => {
    setCurrentCommunity(id);
    setShowJoinForm(true);
  };

  // 提交加入表单
  const handleSubmitJoinForm = () => {
    // 表单验证
    if (!formData.name || !formData.phone || !formData.email) {
      toast.warning("请填写完整的信息");
      return;
    }

    // 简单的邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.warning("请输入有效的邮箱地址");
      return;
    }

    setIsLoading(true);

    // 模拟API请求延迟
    setTimeout(() => {
      setCommunities(communities.map(community => 
        community.id === currentCommunity 
          ? { ...community, isJoined: true } 
          : community
      ));
      setShowJoinForm(false);
      setFormData({ name: '', phone: '', email: '' });
      setIsLoading(false);
      toast.success("加入社群成功！");
    }, 1500);
  };

  // 报名参加活动
  const handleRegisterEvent = (id: number) => {
    // 这里可以添加更复杂的报名逻辑，比如收集用户信息等
    toast.success("活动报名成功！我们会发送详细信息到您的邮箱。");
  };

  // 过滤社群
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || community.tags.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

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
                辰宿 - 线下活动社群
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">线下活动社群</h1>
          <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            找到志同道合的朋友，一起参与有趣的线下活动，拓展社交圈
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto mb-8 pb-2 gap-4">
          <button
            onClick={() => setSelectedTab('communities')}
            className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              selectedTab === 'communities'
                ? 'bg-purple-600 text-white shadow-md'
                : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>社群列表</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              selectedTab === 'upcoming'
                ? 'bg-blue-600 text-white shadow-md'
                : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          ><div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>活动预告</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedTab('past')}
            className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              selectedTab === 'past'
                ? 'bg-green-600 text-white shadow-md'
                : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            <div className="flex items-center gap-2">
              <Award size={18} />
              <span>活动回顾</span>
            </div>
          </button>
        </div>

        {/* Tab Content */}
        {selectedTab === 'communities' && (
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
                  placeholder="搜索社群..."
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

            {/* 社群分类标签 */}
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
                onClick={() => setActiveFilter('户外')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  activeFilter === '户外'
                    ? 'bg-blue-600 text-white'
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`}
              >
                户外
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
                onClick={() => setActiveFilter('美食')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  activeFilter === '美食'
                    ? 'bg-amber-600 text-white'
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`}
              >
                美食
              </button>
              <button
                onClick={() => setActiveFilter('心理')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                  activeFilter === '心理'
                    ? 'bg-pink-600 text-white'
                    : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
                }`}
              >
                心理
              </button>
            </div>

            {/* 社群列表 */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCommunities.map((community) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      {community.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-4">
                      <Users size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {community.members} 位成员
                      </span>
                    </div>
                    
                    <p className={`mb-4 line-clamp-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                      {community.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {community.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs ${
                            theme === 'dark'
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleJoinCommunity(community.id)}
                      disabled={community.isJoined}
                      className={`w-full py-2 rounded-lg font-medium transition-all ${
                        community.isJoined
                          ? `${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'} cursor-not-allowed`
                          : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
                      }`}
                    >
                      {community.isJoined ? '已加入' : '加入社群'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedTab === 'upcoming' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6 md:w-2/3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        event.category === '户外'
                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          : event.category === '文化'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            : event.category === '心理'
                              ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {event.category}
                      </span>
                    </div>
                    
                    <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      {event.title}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <Calendar size={18} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                        </div>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{event.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <Clock size={18} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                        </div>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <MapPin size={18} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                        </div>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{event.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <Users size={18} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                        </div>
                        <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {event.participants} / {event.maxParticipants} 人已报名
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleRegisterEvent(event.id)}
                      disabled={event.participants >= event.maxParticipants}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        event.participants >= event.maxParticipants
                          ? `${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'} cursor-not-allowed`
                          : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
                      }`}
                    >
                      {event.participants >= event.maxParticipants ? '名额已满' : '报名参加'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {selectedTab === 'past' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {pastEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 mb-4">
                    <Calendar size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {event.date}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {event.participants} 人参与
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Heart size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {event.feedbackCount} 条反馈
                        </span>
                      </div>
                    </div>
                    
                     <button 
                       onClick={() => setSelectedEvent(event.id)}
                       className={`px-4 py-2 rounded-lg text-sm ${
                         theme === 'dark'
                           ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                       } transition-colors`}
                     >
                      查看回顾
                    </button>
                  </div>
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

      {/* 加入社群表单弹窗 */}
      {showJoinForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className={`w-full max-w-md p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">加入社群</h3>
              <button
                onClick={() => {
                  setShowJoinForm(false);
                  setFormData({ name: '', phone: '', email: '' });
                }}
                className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              请填写以下信息，申请加入社群。我们会尽快审核并通知您。
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  姓名
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                  placeholder="请输入您的姓名"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  手机号码
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                  placeholder="请输入您的手机号码"
                />
              </div>
              
              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  邮箱地址
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all`}
                  placeholder="请输入您的邮箱地址"
                />
              </div>
            </div>
            
            <button
              onClick={handleSubmitJoinForm}
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
                <span>提交申请</span>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* 活动回顾详情弹窗 */}
      {selectedEvent !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
        >
          <div className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-inherit z-10 pb-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold">活动回顾</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X size={20} />
              </button>
            </div>
            
            {pastEvents.find(e => e.id === selectedEvent) && (
              <>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-4">{pastEvents.find(e => e.id === selectedEvent)?.title}</h1>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center">
                      <Calendar size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {pastEvents.find(e => e.id === selectedEvent)?.date}
                      </span>
                      <div className="mx-2 w-1 h-1 rounded-full bg-gray-400"></div>
                      <div className="flex items-center gap-1">
                        <Users size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {pastEvents.find(e => e.id === selectedEvent)?.participants} 人参与
                        </span>
                      </div>
                      <div className="mx-2 w-1 h-1 rounded-full bg-gray-400"></div>
                      <div className="flex items-center gap-1">
                        <Heart size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {pastEvents.find(e => e.id === selectedEvent)?.feedbackCount} 条反馈
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <img
                      src={pastEvents.find(e => e.id === selectedEvent)?.image}
                      alt={pastEvents.find(e => e.id === selectedEvent)?.title}
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                  
                  <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
                    <div className={`whitespace-pre-line leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {pastEvents.find(e => e.id === selectedEvent)?.content}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      theme === 'dark' 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      <Heart size={16} />
                      <span>收藏</span>
                    </button>
                  </div>
                  
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    <Share2 size={16} />
                    <span>分享</span>
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

export default EventsPage;