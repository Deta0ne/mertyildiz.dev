import { defineQuery } from "next-sanity";

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