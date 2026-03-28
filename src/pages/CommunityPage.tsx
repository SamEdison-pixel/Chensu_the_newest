import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, AlertTriangle, BookMarked, Heart, 
  ThumbsUp, Share2, Send, User, Filter, Search, 
  ChevronDown, Calendar, CheckCircle, ArrowUpRight, 
  X, ExternalLink
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CommunityPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('treehole');
  const [树洞Content, set树洞Content] = useState('');
  const [posts, setPosts] = useState<Array<{
    id: number;
    content: string;
    author: string;
    time: string;
    likes: number;
    comments: number;
    isLiked: boolean;
  }>>([]);
  const [stories, setStories] = useState<Array<{
    id: number;
    title: string;
    excerpt: string;
    author: string;
    time: string;
    readCount: number;
    likes: number;
    content: string;
  }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNegativeAlert, setShowNegativeAlert] = useState(false);
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  // 模拟数据
  useEffect(() => {
    // 模拟树洞帖子数据 - 增加7个评论
    setPosts([
      {
        id: 1,
        content: "最近工作压力真的很大，感觉喘不过气来...但是在这里我可以畅所欲言，不用在意别人的眼光。",
        author: "匿名用户",
        time: "10分钟前",
        likes: 24,
        comments: 8,
        isLiked: false
      },
      {
        id: 2,
        content: "今天一个人去看了电影，感觉也挺好的。其实单身生活也可以很精彩，不是吗？",
        author: "匿名用户",
        time: "1小时前",
        likes: 45,
        comments: 12,
        isLiked: false
      },
      {
        id: 3,
        content: "失眠已经困扰我很久了，有没有同样经历的朋友可以分享一下经验？",
        author: "匿名用户",
        time: "3小时前",
        likes: 32,
        comments: 15,
        isLiked: false
      },
      {
        id: 4,
        content: "最近开始尝试冥想，虽然每天只有短短十分钟，但真的能感受到内心的平静。推荐给所有压力大的朋友！",
        author: "匿名用户",
        time: "昨天",
        likes: 67,
        comments: 23,
        isLiked: false
      },
      {
        id: 5,
        content: "周末一个人去爬山，途中遇到了同样独自旅行的人，我们一起登顶看了美丽的日落。有时候，一个人的旅程也会有惊喜。",
        author: "匿名用户",
        time: "3天前",
        likes: 124,
        comments: 31,
        isLiked: false
      },
      {
        id: 6,
        content: "刚刚结束了一段三年的感情，虽然很痛苦，但我知道这是正确的选择。感谢这个社区给我支持和力量。",
        author: "匿名用户",
        time: "1周前",
        likes: 89,
        comments: 42,
        isLiked: false
      },
      {
        id: 7,
        content: "作为一名自由职业者，独自工作已经成为常态。我想知道大家是如何平衡工作和社交的？",
        author: "匿名用户",
        time: "2周前",
        likes: 56,
        comments: 29,
        isLiked: false
      },
      {
        id: 8,
        content: "昨天参加了一个读书会，认识了很多有意思的人。大家分享的观点让我受益匪浅，原来独处和社交并不矛盾。",
        author: "匿名用户",
        time: "3周前",
        likes: 43,
        comments: 17,
        isLiked: false
      },
      {
        id: 9,
        content: "想问问大家，你们都是如何处理节日期间的孤独感的？特别是像春节这样的传统节日...",
        author: "匿名用户",
        time: "1个月前",
        likes: 112,
        comments: 58,
        isLiked: false
      },
      {
        id: 10,
        content: "分享一个小确幸：今天自己做了一顿丰盛的晚餐，配上喜欢的音乐，感觉特别满足。一个人也要好好生活！",
        author: "匿名用户",
        time: "1个月前",
        likes: 96,
        comments: 34,
        isLiked: false
      }
    ]);

    // 模拟孤勇者故事集数据 - 新增5个可点击的文章
    setStories([
      {
        id: 1,
        title: "我选择单身的十年：自由与成长的旅程",
        excerpt: "十年前，我做出了一个重要决定：不因为社会压力而结婚。这十年，我经历了...",
        author: "城市探险家",
        time: "2天前",
        readCount: 1245,
        likes: 236,
        content: "十年前，我做出了一个重要决定：不因为社会压力而结婚。这十年，我经历了无数的起起落落，但从未后悔过这个选择。\n\n单身的生活让我有更多的时间和精力专注于自己的事业和兴趣爱好。我走遍了大半个中国，探索了许多美丽的地方，认识了各种各样的人。我学会了独立，学会了如何与自己相处，也学会了如何在没有伴侣的情况下找到生活的意义和快乐。\n\n当然，单身生活也有孤独的时候，特别是在节日里。但我逐渐明白，孤独并不是一件坏事，它让我有机会审视自己的内心，思考自己真正想要的生活。我开始享受独处的时光，读书、写作、学习新技能，让自己不断成长。\n\n现在的我，依然单身，但我感到满足和幸福。我相信，每个人都有自己的生活节奏，不必因为外界的压力而改变自己。重要的是，找到属于自己的幸福方式。"
      },
      {
        id: 2,
        title: "单身不孤单：我的独居生活指南",
        excerpt: "独居并不意味着孤独。相反，它给了我更多时间去探索自己的兴趣爱好...",
        author: "心灵守护者",
        time: "5天前",
        readCount: 987,
        likes: 189,
        content: "独居已经五年了，从最初的不适应到现在的享受，我想分享一些关于独居生活的心得和技巧。\n\n首先，布置一个舒适的家至关重要。我把我的小公寓装饰成了一个温馨的港湾，每一件家具和装饰品都经过精心挑选，让我感到放松和愉悦。我还养了一只猫，它给我的生活带来了很多欢乐和陪伴。\n\n其次，保持规律的生活习惯很重要。我每天早睡早起，坚持锻炼，保持健康的饮食。这些习惯不仅让我保持良好的身体状态，也帮助我保持积极的心态。\n\n再者，培养兴趣爱好是充实独居生活的好方法。我学习了绘画、烹饪和摄影，这些爱好让我的生活变得丰富多彩。我还加入了一些线上和线下的兴趣小组，认识了很多志同道合的朋友。\n\n最后，不要害怕社交。虽然我享受独处，但我也会定期和朋友聚会，参加各种活动。独处和社交并不矛盾，关键是找到适合自己的平衡。\n\n独居并不意味着孤独，它可以是一种自由、充实、充满可能性的生活方式。只要用心经营，独居生活也可以很精彩。"
      },
      {
        id: 3,
        title: "从职场焦虑到心灵平静：我的自愈之路",
        excerpt: "工作压力曾让我濒临崩溃，但通过自我探索和专业帮助，我找到了内心的平静...",
        author: "职场达人",
        time: "1周前",
        readCount: 1567,
        likes: 324,
        content: "作为一名互联网行业的从业者，我曾经长期处于高压状态。加班熬夜是常态，焦虑和失眠困扰着我，甚至影响到了我的身体健康。我意识到，我必须做出改变。\n\n首先，我开始寻求专业的帮助。心理咨询师帮助我认识到自己的压力源，并教给我一些应对焦虑的方法。我也开始尝试冥想和瑜伽，这些活动帮助我放松身心，减轻压力。\n\n其次，我调整了自己的工作态度和生活方式。我学会了拒绝不必要的工作，设定合理的边界，保证充足的休息和睡眠时间。我也开始培养一些工作之外的兴趣爱好，让自己的生活更加平衡。\n\n再者，我开始关注自己的内心需求。我学会了倾听自己的感受，接纳自己的不完美。我不再过分追求完美，而是学会了欣赏自己的进步和成就。\n\n经过一段时间的努力，我逐渐走出了焦虑的阴影，找到了内心的平静。现在的我，依然在忙碌的职场中奋斗，但我已经学会了如何照顾自己，如何在压力中保持平衡。\n\n我想告诉所有正在经历类似困扰的人：你并不孤单，寻求帮助不是软弱的表现，而是勇敢的开始。只要你愿意改变，就一定能够找到属于自己的平静之路。"
      },
      {
        id: 4,
        title: "三十岁的我，终于和自己和解了",
        excerpt: "三十岁是一个特殊的年龄，特别是对于单身女性来说。社会的压力曾让我感到焦虑和迷茫...",
        author: "阳光女孩",
        time: "2周前",
        readCount: 2345,
        likes: 456,
        content: "三十岁生日那天，我坐在自己的小公寓里，回顾过去的十年。大学毕业、进入职场、换过几份工作、谈过几次恋爱，现在依然单身。社会上关于'三十岁未婚女性'的各种声音曾经让我感到焦虑和迷茫，但现在的我，终于和自己和解了。\n\n我意识到，年龄只是一个数字，不应该成为定义一个人价值的标准。每个人都有自己的生活节奏，不必因为外界的压力而改变自己。我开始重新审视自己的生活，发现其实我已经拥有了很多：一份喜欢的工作、一群知心的朋友、健康的身体、自由的时间...\n\n我开始更加关注自己的内心需求，做自己真正喜欢的事情。我学习了新的技能，去了一直想去的地方，尝试了各种新鲜的事物。我发现，当我不再在意别人的眼光，不再给自己设限时，生活变得更加丰富多彩。\n\n现在的我，依然单身，但我感到满足和幸福。我相信，爱情会在适当的时候到来，而在此之前，我要好好享受单身的时光，让自己变得更加优秀。\n\n三十岁的我，终于明白：真正的幸福，不是活成别人期待的样子，而是活成自己喜欢的样子。"
      },
      {
        id: 5,
        title: "一个人的旅行，遇见更好的自己",
        excerpt: "去年，我做了一个大胆的决定：辞掉工作，一个人去旅行。那三个月的旅程，彻底改变了我的生活...",
        author: "旅行爱好者",
        time: "3周前",
        readCount: 1876,
        likes: 345,
        content: "去年，我做了一个大胆的决定：辞掉工作，一个人去旅行。那三个月的旅程，彻底改变了我的生活。\n\n我去了云南、四川、西藏等地，看到了壮丽的自然风光，体验了不同的民族文化，认识了各种各样的人。在旅途中，我遇到了很多独自旅行的人，他们的故事和经历让我深受启发。\n\n一个人的旅行让我学会了独立和坚强。在遇到困难和挑战时，我必须自己想办法解决。这种经历让我变得更加自信和成熟。同时，一个人的旅行也让我有更多的时间和机会与自己对话，思考自己真正想要的生活。\n\n在旅途中，我也发现了很多生活的美好。一个陌生的微笑、一次偶然的相遇、一场美丽的日落...这些看似平凡的瞬间，却让我感受到了生活的温暖和美好。\n\n旅行结束后，我回到了原来的城市，但我已经不是原来的我了。我对生活有了新的理解和感悟，对未来也有了更清晰的规划。我相信，这次旅行将是我人生中最宝贵的财富之一。\n\n如果你也对生活感到迷茫，不妨尝试一次一个人的旅行。在旅途中，你可能会遇见更好的自己。"
      },
      {
        id: 6,
        title: "单身经济学：如何让独处变成一种优势",
        excerpt: "作为一名经济学家，我从经济学的角度分析了单身生活的优势和挑战...",
        author: "经济学者",
        time: "1个月前",
        readCount: 1678,
        likes: 289,
        content: "作为一名经济学家，我从经济学的角度分析了单身生活的优势和挑战，发现单身其实可以是一种经济优势。\n\n首先，单身人士有更多的时间和精力投入到工作和事业中，这有助于提升自己的职业竞争力和收入水平。其次，单身人士的消费决策更加灵活，可以根据自己的需求和喜好进行消费，不必考虑他人的意见和需求。再者，单身人士可以更加自由地选择居住地和工作地，这有助于找到更适合自己的发展机会。\n\n当然，单身生活也有一些经济挑战，比如住房成本较高、缺乏家庭支持等。但这些挑战是可以通过合理的规划和安排来应对的。例如，单身人士可以选择与朋友合租，或者购买小户型的房子；可以建立自己的社交网络和支持系统，弥补家庭支持的不足。\n\n从经济学的角度来看，单身生活其实是一种理性的选择。它不仅可以带来经济上的优势，还可以带来更多的自由和发展机会。当然，每个人的情况不同，选择单身还是恋爱结婚，应该根据自己的实际情况和需求来决定，而不是受到社会压力的影响。\n\n无论选择哪种生活方式，重要的是要对自己的选择负责，并且努力让自己的生活变得更加美好。"
      },
      {
        id: 7,
        title: "我的单身厨房：一个人的美食之旅",
        excerpt: "作为一个单身人士，我喜欢在厨房中寻找乐趣。烹饪不仅是一种生存技能，更是一种生活艺术...",
        author: "美食家",
        time: "1个月前",
        readCount: 1456,
        likes: 234,
        content: "作为一个单身人士，我喜欢在厨房中寻找乐趣。烹饪不仅是一种生存技能，更是一种生活艺术，一种表达自我的方式。\n\n我喜欢尝试各种不同的 recipes，从简单的家常菜到复杂的异国料理。每一道菜的制作过程都是一次创造的过程，让我感到无比的满足和快乐。当我品尝自己亲手制作的美食时，那种成就感和幸福感是无法用言语形容的。\n\n烹饪也让我学会了耐心和细致。一道美味的菜肴需要精心的准备和烹饪，不能急躁。这种心态也影响了我的生活态度，让我变得更加从容和淡定。\n\n此外，烹饪还是一种社交的方式。我经常邀请朋友来家里做客，为他们准备美食。在分享美食的同时，我们也分享了彼此的生活和故事。这些温馨的时光，让我的单身生活变得更加丰富和有意义。\n\n如果你也是一个单身人士，不妨尝试在厨房中寻找乐趣。你会发现，烹饪不仅可以满足你的味蕾，还可以丰富你的生活，甚至改变你的心态。"
      },
      {
        id: 8,
        title: "数字游民的单身生活：自由与挑战并存",
        excerpt: "作为一名数字游民，我过着一种与众不同的单身生活。这种生活方式既有自由和灵活的一面...",
        author: "数字游民",
        time: "2个月前",
        readCount: 2134,
        likes: 389,
        content: "作为一名数字游民，我过着一种与众不同的单身生活。这种生活方式既有自由和灵活的一面，也有挑战和困难的一面。\n\n数字游民的生活让我可以自由地选择工作地点和生活方式。我可以在海边的咖啡馆工作，也可以在山间的民宿里办公。这种自由和灵活，让我的生活充满了可能性和惊喜。\n\n同时，数字游民的生活也让我有更多的时间和机会去探索世界。我可以在工作之余去爬山、徒步、摄影，去体验不同的文化和生活方式。这些经历让我的生活变得更加丰富多彩，也让我增长了见识和阅历。\n\n当然，数字游民的生活也有一些挑战。比如，工作和生活的界限变得模糊，需要更强的自律能力；经常变换环境，可能会感到孤独和不安；缺乏稳定的社交网络和支持系统，等等。但这些挑战是可以通过合理的规划和调整来应对的。\n\n总的来说，我很享受数字游民的单身生活。它让我有机会去探索世界，去认识自己，去寻找生活的意义和价值。虽然这种生活方式并不适合所有人，但对于我来说，它是一种理想的生活方式。"
      }
    ]);
  }, []);

  // 检测负面情绪关键词
  const checkNegativeEmotions = (content: string) => {
    const negativeKeywords = ['崩溃', '失眠', '压力', '焦虑', '抑郁', '痛苦', '绝望', '自杀', '难过'];
    return negativeKeywords.some(keyword => content.includes(keyword));
  };

  // 发布树洞内容
  const handleSubmit树洞 = () => {
    if (!树洞Content.trim()) {
      toast.warning("请输入内容后再发布");
      return;
    }

    setIsSubmitting(true);

    // 模拟API请求延迟
    setTimeout(() => {
      const newPost = {
        id: posts.length + 1,
        content: 树洞Content,
        author: "匿名用户",
        time: "刚刚",
        likes: 0,
        comments: 0,
        isLiked: false
      };

      setPosts([newPost, ...posts]);
      set树洞Content('');
      setIsSubmitting(false);
      toast.success("发布成功！");

      // 检查是否包含负面情绪关键词
      if (checkNegativeEmotions(树洞Content)) {
        setShowNegativeAlert(true);
      }
    }, 1000);
  };

  // 点赞功能
  const handleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1, 
            isLiked: !post.isLiked 
          } 
        : post
    ));
  };

  // 处理情绪预警弹窗的干预选项
  const handleInterventionOption = (option: string) => {
    setShowNegativeAlert(false);
    
    if (option === '冥想课程') {
      toast.info("正在为您打开5分钟冥想课程...");
      // 这里可以添加跳转到冥想课程的逻辑
    } else if (option === '专业咨询') {
      toast.info("正在为您连接专业咨询师...");
      navigate('/courses'); // 跳转到专业课程与咨询页面
    }
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
                辰宿 - 情感共鸣社区
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
        ><h1 className="text-3xl md:text-4xl font-bold mb-4">情感共鸣社区</h1>
          <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            在这里，你可以自由表达内心的声音，找到情感共鸣，获取温暖支持
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto mb-8 pb-2 gap-4">
          <button
            onClick={() => setSelectedTab('treehole')}
            className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              selectedTab === 'treehole'
                ? 'bg-purple-600 text-white shadow-md'
                : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageCircle size={18} />
              <span>匿名树洞</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedTab('stories')}
            className={`px-6 py-3 rounded-full whitespace-nowrap transition-all ${
              selectedTab === 'stories'
                ? 'bg-blue-600 text-white shadow-md'
                : `${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
            }`}
          >
            <div className="flex items-center gap-2">
              <BookMarked size={18} />
              <span>孤勇者故事集</span>
            </div>
          </button>
        </div>

        {/* Tab Content */}
        {selectedTab === 'treehole' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 树洞输入框 */}
            <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                  <User size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                </div>
                <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>匿名用户</span>
              </div>
              <textarea
                value={树洞Content}
                onChange={(e) => set树洞Content(e.target.value)}
                placeholder="分享你的心事、压力或想法...这里是你的安全空间"
                className={`w-full p-4 rounded-xl min-h-[120px] ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white placeholder-gray-400'
                    : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                } border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    handleSubmit树洞();
                  }
                }}
              />
              <div className="flex justify-between items-center mt-4">
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span>Ctrl + Enter 快速发布</span>
                </div>
                <button
                  onClick={handleSubmit树洞}
                  disabled={isSubmitting || !树洞Content.trim()}
                  className={`px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 ${
                    (isSubmitting || !树洞Content.trim()) && 'opacity-70 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      <span>发布中...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send size={16} />
                      <span>发布树洞</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* 树洞帖子列表 */}
            <div className="space-y-6">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                        <User size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                      </div>
                      <div className="ml-3">
                        <div className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{post.author}</div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{post.time}</div>
                      </div>
                    </div>
                    <button className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                      <i className="fa-solid fa-ellipsis-h"></i>
                    </button>
                  </div>
                  
                  <div className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                    {post.content}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
                        post.isLiked
                          ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                          : `${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`
                      }`}
                    >
                      <ThumbsUp size={16} />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
                      theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                    }`}>
                      <MessageCircle size={16} />
                      <span>{post.comments}</span>
                    </button>
                    
                    <button className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
                      theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                    }`}>
                      <Share2 size={16} />
                      <span>分享</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedTab === 'stories' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 故事列表 */}
            <div className="space-y-6">
              {stories.map((story) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                    {story.title}
                  </h3>
                  
                  <p className={`mb-4 line-clamp-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {story.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                        <User size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                      </div>
                      <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {story.author}
                      </span>
                      <div className="mx-2 w-1 h-1 rounded-full bg-gray-400"></div>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {story.time}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <BookMarked size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {story.readCount}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Heart size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {story.likes}
                        </span>
                      </div>
                      
                       <button 
                         onClick={() => setSelectedStory(story.id)}
                         className={`p-2 rounded-full ${theme === 'dark' ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'} transition-colors`}
                       >
                         <ExternalLink size={16} />
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* 加载更多按钮 */}
            <div className="mt-8 text-center">
              <button className={`px-6 py-3 rounded-full ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-md hover:shadow-lg transition-all`}>
                加载更多故事
              </button>
            </div>
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

      {/* 负面情绪预警弹窗 */}
      {showNegativeAlert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className={`w-full max-w-md p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mr-4">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-semibold">情绪关怀</h3>
            </div>
            
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              我们注意到您可能正在经历一些情绪困扰。以下是我们为您准备的支持选项：
            </p>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleInterventionOption('冥想课程')}
                className={`w-full p-3 rounded-lg flex items-center justify-between ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                } transition-colors`}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
                    <CheckCircle size={18} />
                  </div>
                  <span>尝试5分钟冥想课程</span>
                </div>
                <ArrowUpRight size={16} />
              </button>
              
              <button
                onClick={() => handleInterventionOption('专业咨询')}
                className={`w-full p-3 rounded-lg flex items-center justify-between ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                } transition-colors`}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
                    <CheckCircle size={18} />
                  </div>
                  <span>联系专业心理咨询师</span>
                </div>
                <ArrowUpRight size={16} />
              </button>
            </div>
            
            <button
              onClick={() => setShowNegativeAlert(false)}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg transition-all"
            >
              我知道了，谢谢
            </button>
          </div>
        </motion.div>
      )}

      {/* 故事详情弹窗 */}
      {selectedStory !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
        >
          <div className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-inherit z-10 pb-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold">文章详情</h3>
              <button
                onClick={() => setSelectedStory(null)}
                className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X size={20} />
              </button>
            </div>
            
            {stories.find(s => s.id === selectedStory) && (
              <>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-4">{stories.find(s => s.id === selectedStory)?.title}</h1>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                        <User size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                      </div>
                      <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {stories.find(s => s.id === selectedStory)?.author}
                      </span>
                      <div className="mx-2 w-1 h-1 rounded-full bg-gray-400"></div>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {stories.find(s => s.id === selectedStory)?.time}
                      </span>
                    </div>
                    
                    <div className="ml-auto flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <BookMarked size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {stories.find(s => s.id === selectedStory)?.readCount}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Heart size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {stories.find(s => s.id === selectedStory)?.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`}>
                    <div className={`whitespace-pre-line leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {stories.find(s => s.id === selectedStory)?.content}
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
                      <span>点赞</span>
                    </button>
                    
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      theme === 'dark' 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      <BookMarked size={16} />
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

export default CommunityPage;