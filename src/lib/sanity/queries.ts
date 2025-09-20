import { defineQuery } from "next-sanity";

export interface SocialLink {
  _id: string;
  title: string;
  url: string;
  iconSvg: string;
  order: number;
  isActive: boolean;
}

export const TIMELINE_QUERY = defineQuery(`
  *[_type == "timeline"] | order(order asc) {
    _id,
    title,
    description,
    date,
    icon,
    isActive,
    order
  }
`);

export const TECH_STACK_QUERY = defineQuery(`
  *[_type == "techStack"] | order(category asc, order asc) {
    _id,
    name,
    category,
    description,
    isFavorite,
    isLearning,
    order,
    "slug": slug.current
  }
`);

export const PROFILE_QUERY = defineQuery(`
  *[_type == "profile" && isActive == true][0] {
    _id,
    greeting,
    bio
  }
`);

export const SOCIAL_LINKS_QUERY = defineQuery(`
  *[_type == "socialLink" && isActive == true] | order(order asc, title asc) {
    _id,
    title,
    url,
    iconSvg,
    order,
    isActive
  }
`);