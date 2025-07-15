// This is the updated navigation data with more intuitive categories
import { Bot, Globe, FolderClosed, Settings, Link } from "lucide-react";
export const navData = {
  navMain: [
    {
      title: "Chat Assistant",
      icon: Bot,
      items: [
        {
          title: "Ask Questions",
          url: "/dashboard",
        },
        {
          title: "View History",
          url: "/dashboard/chat/chat-history",
        },
      ],
    },
    {
      title: "Collect Website Info",
      icon: Globe,
      items: [
        {
          title: "Extract Info from URLs",
          url: "/dashboard/files/urls",
          // isActive: true,
        },
        // {
        //   title: "Batch Processing",
        //   url: "/files/multiple-urls",
        // },
        // {
        //   title: "Scheduled Scraping",
        //   url: "#",
        // },
      ],
    },
    {
      title: "My Documents",
      icon: FolderClosed,
      items: [
        {
          title: " Extract Info from Files",
          url: "/dashboard/files/file-upload",
        },
      ],
    },
    // {
    //   title: "Data Processing",
    //   icon: Database,
    //   items: [
    //     {
    //       title: "Content Filters",
    //       url: "#",
    //     },
    //     {
    //       title: "Data Export",
    //       url: "#",
    //     },
    //     {
    //       title: "Data Templates",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Learn & Improve AI",
      icon: Bot,
      items: [
        {
          title: "Business Goals",
          url: "/dashboard/trainings/business-goals",
        },
        {
          title: "FAQs",
          url: "/dashboard/trainings/faqs",
        },
        {
          title: "Rate AI Responses",
          url: "/dashboard/trainings/feedbacks",
        },
      ],
    },
    {
      title: "Integrations",
      icon: Link,
      items: [
        {
          title: "Chat Widget",
          url: "/dashboard/widget-integrations",
        },
        {
          title: "Services",
          url: "/dashboard/integration-services",
        },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      items: [
        {
          title: "API Configuration",
          url: "/dashboard/settings/api-configurations",
        },
      ],
    },
  ],
};
