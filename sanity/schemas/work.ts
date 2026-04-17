import {defineType, defineField} from 'sanity'
 
export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    defineField({
      name: 'pieceName',
      title: 'Piece Name',
      type: 'string',
      description: 'Optional — leave blank to hide.',
    }),
    defineField({
      name: 'technique',
      title: 'Technique / Medium',
      type: 'string',
      description: 'e.g. "Oil on linen", "Charcoal on paper". Optional.',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      description: 'e.g. "120 × 90 cm". Optional.',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. "2024". Optional.',
    }),
 
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
 
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Upload the artwork photo.',
      hidden: ({parent}) => parent?.mediaType !== 'image',
      validation: (R) =>
        R.custom((val, ctx) => {
          const t = (ctx.parent as any)?.mediaType
          if (t === 'image' && !val) return 'Image is required for image works'
          return true
        }),
    }),
 
    defineField({
      name: 'posterImage',
      title: 'Video Poster Image',
      type: 'image',
      options: {hotspot: true},
      description:
        'A still frame shown before the video plays. Strongly recommended so the carousel has something to display.',
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File (upload)',
      type: 'file',
      options: {accept: 'video/mp4,video/webm,video/quicktime'},
      description:
        'Upload an MP4/WebM. For videos under ~20MB. For larger files, use the Video URL field instead (e.g. Vimeo, Cloudflare Stream).',
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (external)',
      type: 'url',
      description:
        'Paste a link to a video hosted elsewhere. Supports Vimeo (e.g. https://vimeo.com/123456789), YouTube, or a direct .mp4 URL (e.g. Cloudflare Stream). Use this for larger videos instead of the upload field above.',
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
  ],
 
  preview: {
    select: {
      title: 'pieceName',
      technique: 'technique',
      year: 'year',
      mediaType: 'mediaType',
      image: 'image',
      poster: 'posterImage',
    },
    prepare({title, technique, year, mediaType, image, poster}) {
      const bits = [technique, year].filter(Boolean).join(' · ')
      return {
        title: title || 'Untitled work',
        subtitle: `${mediaType === 'video' ? '▶ ' : ''}${bits}`,
        media: mediaType === 'video' ? poster : image,
      }
    },
  },
})