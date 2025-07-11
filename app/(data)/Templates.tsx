import { TEMPLATE } from '@/types/template';

const Templates: TEMPLATE[] = [
  {
    name: 'Blog Title',
    desc: 'An AI tool that generate blog title depends on your blog information',
    category: 'Blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/4186/4186534.png',
    slug: 'generate-blog-title',
    aiPrompt: 'Give me 5 blog topic idea in bullet wise only based on give niche & outline and give me result in Rich text editor format',
    form: [
      {
        label: 'Enter your blog niche',
        field: 'input',
        name: 'niche',
        required: true
      },
      {
        label: 'Enter blog outline',
        field: 'textarea',
        name: 'outline'
      }
    ]
  },
  {
    name: 'Blog Content',
    desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
    category: 'blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/4905/4905454.png',
    slug: 'blog-content-generation',
    aiPrompt: 'Generate Blog Content based on topic and outline in rich text editor format',
    form: [
      {
        label: 'Enter your blog topic',
        field: 'input',
        name: 'topic',
        required: true
      },
      {
        label: 'Enter blog Outline here',
        field: 'textarea',
        name: 'outline'
      }
    ]
  },
  {
    name: 'Blog Topic Ideas',
    desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
    category: 'Blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/11497/11497847.png',
    slug: 'blog-topic-idea',
    aiPrompt: 'Generate top 5 Blog Topic Ideas in bullet point only, (no Description) based on niche in rich text editor format',
    form: [
      {
        label: 'Enter your Niche',
        field: 'input',
        name: 'niche',
        required: true
      }
    ]
  },
  {
    name: 'Youtube SEO Title',
    desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
    category: 'Youtube Tools',
    icon: 'https://cdn-icons-png.flaticon.com/128/402/402075.png',
    slug: 'youtube-seo-title',
    aiPrompt: 'Give me Best SEO optimized high ranked 5 title ideas bullet wise only based on keywords and outline and give me result in HTML tags format',
    form: [
      {
        label: 'Enter your youtube video topic keywords',
        field: 'input',
        name: 'keywords',
        required: true
      },
      {
        label: 'Enter youtube description Outline here',
        field: 'textarea',
        name: 'outline'
      }
    ]
  },
  {
    name: 'Youtube Description',
    desc: 'An AI tool that generates SEO-friendly YouTube video descriptions with emojis.',
    category: 'Youtube Tool',
    icon: 'https://cdn-icons-png.flaticon.com/128/2111/2111748.png',
    slug: 'youtube-description',
    aiPrompt: 'Generate Youtube description with emoji under 4-5 lines based on topic and outline in rich text editor format',
    form: [
      {
        label: 'Enter your blog topic/title',
        field: 'input',
        name: 'topic',
        required: true
      },
      {
        label: 'Enter youtube Outline here',
        field: 'textarea',
        name: 'outline'
      }
    ]
  },
  {
    name: 'Youtube Tags',
    desc: 'Generate relevant YouTube tags to optimize your video SEO.',
    category: 'Youtube Tool',
    icon: 'https://cdn-icons-png.flaticon.com/128/4674/4674918.png',
    slug: 'youtube-tag',
    aiPrompt: 'Generate 10 Youtube tags in bullet point based on title and outline in rich text editor format',
    form: [
      {
        label: 'Enter your youtube title',
        field: 'input',
        name: 'title',
        required: true
      },
      {
        label: 'Enter youtube video Outline here (Optional)',
        field: 'textarea',
        name: 'outline'
      }
    ]
  },
  {
    name: 'Rewrite Article (Plagiarism Free)',
    desc: 'Use this tool to rewrite existing content that is plagiarism-free and bypasses AI detectors.',
    category: 'Rewriting Tool',
    icon: 'https://cdn-icons-png.flaticon.com/128/3131/3131607.png',
    slug: 'rewrite-article',
    aiPrompt: 'Rewrite given article without any Plagiarism in rich text editor format',
    form: [
      {
        label: '🤖 Provide your Article/Blogpost or any other content to rewrite.',
        field: 'textarea',
        name: 'article',
        required: true
      }
    ]
  },
  {
    name: 'Text Improver',
    desc: 'Refines your writing by eliminating errors and suggesting better word choices.',
    category: 'Writing Assistant',
    icon: 'https://cdn-icons-png.flaticon.com/128/1686/1686815.png',
    slug: 'text-improver',
    aiPrompt: 'Given textToImprove, Rewrite text without any grammar mistake and professionally in rich text editor format',
    form: [
      {
        label: 'Enter text that you want to re-write or improve',
        field: 'textarea',
        name: 'textToImprove'
      }
    ]
  },
  {
    name: 'Add Emojis to Text',
    desc: 'Add fun and relevant emojis to your plain text.',
    category: 'Blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/2584/2584606.png',
    slug: 'add-emoji-to-text',
    aiPrompt: 'Add Emoji to outline text depends on outline and rewrite it in rich text editor format',
    form: [
      {
        label: 'Enter your text to add emojis',
        field: 'textarea',
        name: 'outline',
        required: true
      }
    ]
  },
  {
    name: 'Instagram Post Generator',
    desc: 'Create catchy Instagram posts using AI.',
    category: 'Blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/15713/15713420.png',
    slug: 'instagram-post-generator',
    aiPrompt: 'Generate 3 Instagram post depends on a given keywords and give output in rich text editor format',
    form: [
      {
        label: 'Enter Keywords for your post',
        field: 'input',
        name: 'keywords',
        required: true
      }
    ]
  },
  {
    name: 'Instagram Hash Tag Generator',
    desc: 'Generate effective Instagram hashtags.',
    category: 'Blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/7045/7045432.png',
    slug: 'instagram-hash-tag-generator',
    aiPrompt: 'Generate 15 Instagram hash tag depends on a given keywords and give output in rich text editor format',
    form: [
      {
        label: 'Enter Keywords for your instagram hashtag',
        field: 'input',
        name: 'keywords',
        required: true
      }
    ]
  },
  {
    name: 'Instagram Post/Reel Idea',
    desc: 'Get trending Instagram post or reel ideas.',
    category: 'Instagram',
    icon: 'https://cdn-icons-png.flaticon.com/128/1029/1029183.png',
    slug: 'instagram-post-idea-generator',
    aiPrompt: 'Generate 5-10 Instagram idea depends on niche with latest trend and give output in rich text editor format',
    form: [
      {
        label: 'Enter Keywords / Niche for your instagram idea',
        field: 'input',
        name: 'keywords',
        required: true
      }
    ]
  },
  {
    name: 'English Grammar Check',
    desc: 'Correct your English grammar mistakes using AI.',
    category: 'English',
    icon: 'https://cdn-icons-png.flaticon.com/128/12596/12596700.png',
    slug: 'english-grammer-checker',
    aiPrompt: 'Rewrite the inputText by correcting the grammar and give output in rich text editor format',
    form: [
      {
        label: 'Enter text to correct the grammar',
        field: 'input',
        name: 'inputText',
        required: true
      }
    ]
  },
  {
    name: 'Write Code',
    desc: 'AI tool to generate programming code in any language.',
    category: 'Coding',
    icon: 'https://cdn-icons-png.flaticon.com/128/6062/6062646.png',
    slug: 'write-code',
    aiPrompt: 'Depends on user codeDescription write a code and give output in rich text editor format in code block',
    form: [
      {
        label: 'Enter description of code you want along with Programming Lang',
        field: 'textarea',
        name: 'codeDesscripton',
        required: true
      }
    ]
  },
  {
    name: 'Explain Code',
    desc: 'AI tool to explain programming code.',
    category: 'Coding',
    icon: 'https://cdn-icons-png.flaticon.com/128/8488/8488751.png',
    slug: 'explain-code',
    aiPrompt: 'Depends on user codeDescription explain code line by line and give output in rich text editor format in code block',
    form: [
      {
        label: 'Enter code which you want to understand',
        field: 'textarea',
        name: 'codeDesscripton',
        required: true
      }
    ]
  },
  {
    name: 'Code Bug Detector',
    desc: 'AI tool to detect bugs in your code and suggest fixes.',
    category: 'Coding',
    icon: 'https://cdn-icons-png.flaticon.com/128/4426/4426267.png',
    slug: 'code-bug-detector',
    aiPrompt: 'Depends on user codeInput find bug in code and give solution and give output in rich text editor format in code block',
    form: [
      {
        label: 'Enter code which you want to test bug',
        field: 'textarea',
        name: 'codeInput',
        required: true
      }
    ]
  },
  {
    name: 'Tagline Generator',
    desc: 'AI tool to generate catchy taglines for your brand.',
    category: 'Marketing',
    icon: 'https://cdn-icons-png.flaticon.com/128/2178/2178616.png',
    slug: 'tagline-generator',
    aiPrompt: 'Depends on user productName and outline generate catchy 5-10 tagline for the business product and give output in rich text editor format',
    form: [
      {
        label: 'Product/Brand Name',
        field: 'input',
        name: 'productName',
        required: true
      },
      {
        label: 'What you are selling / Marketing',
        field: 'textarea',
        name: 'outline',
        required: true
      }
    ]
  },
  {
    name: 'Product Description',
    desc: 'Generate SEO-friendly product descriptions for your e-commerce store.',
    category: 'Marketing',
    icon: 'https://cdn-icons-png.flaticon.com/128/679/679922.png',
    slug: 'product-description',
    aiPrompt: 'Depends on user productName and description generate small description for product for e-commerce business give output in rich text editor format',
    form: [
      {
        label: 'Product Name',
        field: 'input',
        name: 'productName',
        required: true
      },
      {
        label: 'Product Details',
        field: 'textarea',
        name: 'outline',
        required: true
      }
    ]
  }
];

export default Templates;
