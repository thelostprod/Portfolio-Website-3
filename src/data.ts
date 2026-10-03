import { Capability, ContactInfo, WorkCategory } from "./types";

export const workCategoriesData: WorkCategory[] = [
  {
    id: "documentary",
    title: "Documentary",
    subtitle: "Compelling narratives that capture authentic stories and human experiences",
    videos: [
      {
        id: "documentary-2",
        youtubeId: "lsd70rHeJhg",
        thumbnailUrl: "https://img.youtube.com/vi/lsd70rHeJhg/maxresdefault.jpg?v=20261003"
      },
      {
        id: "documentary-4",
        youtubeId: "bdsSTDV2SXg",
        thumbnailUrl: "https://img.youtube.com/vi/bdsSTDV2SXg/maxresdefault.jpg?v=20261003"
      },
      {
        id: "documentary-5",
        youtubeId: "TruEILfscrQ",
        thumbnailUrl: "https://img.youtube.com/vi/TruEILfscrQ/maxresdefault.jpg?v=20261003"
      },
      {
        id: "documentary-6",
        youtubeId: "wCiYugl4gTY",
        thumbnailUrl: "https://img.youtube.com/vi/wCiYugl4gTY/maxresdefault.jpg?v=20261003"
      },
      {
        id: "documentary-3",
        youtubeId: "PKzX2ZXQhXM",
        thumbnailUrl: "https://img.youtube.com/vi/PKzX2ZXQhXM/maxresdefault.jpg?v=20261003"
      }
    ]
  },
  {
    id: "advertisements",
    title: "Advertisements",
    subtitle: "Brand stories and promotional videos",
    videos: [
      {
        id: "advertisement-1",
        youtubeId: "q2MFiQ3KEio",
        thumbnailUrl: "https://img.youtube.com/vi/q2MFiQ3KEio/maxresdefault.jpg?v=20261003"
      }
    ]
  },
  {
    id: "short-form",
    title: "Short Form",
    subtitle: "Short-form video content crafted to capture attention",
    videos: [
      {
        id: "short-form-1",
        youtubeId: "K9EwpxWo2EU",
        thumbnailUrl: "https://img.youtube.com/vi/K9EwpxWo2EU/maxresdefault.jpg?v=20261003"
      },
      {
        id: "short-form-2",
        youtubeId: "EMb3jGohthM",
        thumbnailUrl: "https://img.youtube.com/vi/EMb3jGohthM/maxresdefault.jpg?v=20261003"
      },
      {
        id: "short-form-3",
        youtubeId: "_N-7_5Wrd0Y",
        thumbnailUrl: "https://img.youtube.com/vi/_N-7_5Wrd0Y/maxresdefault.jpg?v=20261003"
      },
      {
        id: "short-form-4",
        youtubeId: "tAU8oE5Xduo",
        thumbnailUrl: "https://img.youtube.com/vi/tAU8oE5Xduo/maxresdefault.jpg?v=20261003"
      }
    ]
  }
];

export const capabilitiesData: Capability[] = [
  {
    id: "video-editing",
    num: "01",
    title: "Video Editing",
    description: "Pristine cinematic pacing, flow matching, and narrative rhythm optimized for audience retention."
  },
  {
    id: "motion-graphics",
    num: "02",
    title: "Motion Graphics",
    description: "Sophisticated typographic animation and minimalist assets that reinforce message clarity."
  },
  {
    id: "creative-direction",
    num: "03",
    title: "Creative Direction",
    description: "End-to-end creative scoping, scripting, and visual guidelines that align content with high-end brand identity."
  },
  {
    id: "video-production",
    num: "04",
    title: "Video Production",
    description: "Complete direction of camera work, composition, lighting, and sound architectures."
  },
  {
    id: "scriptwriting",
    num: "05",
    title: "Scriptwriting",
    description: "Writing strong narrative arcs with instant hooks designed to disrupt fast-scroll behavior."
  },
  {
    id: "content-strategy",
    num: "06",
    title: "Content Strategy",
    description: "Creating comprehensive multi-channel distribution templates and consistent release frameworks."
  }
];

export const contactData: ContactInfo = {
  email: "adarshch0013@gmail.com",
  linkedin: "https://www.linkedin.com/in/adarsh-choudhary-12b505251",
};
