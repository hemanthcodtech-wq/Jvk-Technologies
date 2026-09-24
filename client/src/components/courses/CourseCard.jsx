import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAutoTranslate } from '../../context/LanguageContext';

const courseImageMap = {
  'java-full-stack': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
  'python-full-stack': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
  'mern-stack': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
  'aws-devops': 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
  'software-testing': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
};

const getCourseImage = (course) => {
  if (course?.thumbnailUrl && course.thumbnailUrl.startsWith('http')) return course.thumbnailUrl;
  const slug = (course?.slug || course?._id || course?.category || '').toLowerCase();
  if (slug.includes('java')) return courseImageMap['java-full-stack'];
  if (slug.includes('python') || slug.includes('ai')) return courseImageMap['python-full-stack'];
  if (slug.includes('mern') || slug.includes('react') || slug.includes('web')) return courseImageMap['mern-stack'];
  if (slug.includes('aws') || slug.includes('devops') || slug.includes('cloud')) return courseImageMap['aws-devops'];
  if (slug.includes('test') || slug.includes('qa') || slug.includes('selenium')) return courseImageMap['software-testing'];
  return courseImageMap['java-full-stack'];
};

const CourseCard = ({ course, isEnrolled, isWishlisted, onToggleWishlist, onClick }) => {
  const titleTe = useAutoTranslate(course.title, course.title_te);
  const imageSrc = getCourseImage(course);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-4 md:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-200 flex flex-row md:flex-col gap-4 md:gap-5 hover:-translate-y-1.5 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
      onClick={onClick}
    >
      <div className="w-[110px] h-[110px] md:w-full md:h-52 shrink-0 relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-200">
        <img 
          src={imageSrc} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          onError={(e) => {
            e.target.src = courseImageMap['java-full-stack'];
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

        <div className="hidden md:block absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-extrabold text-blue-600 border border-slate-200 shadow-xs uppercase tracking-wider z-10">
          {course.category || 'Software'}
        </div>
        
        {/* Top Right Badges: Enrolled & Wishlist */}
        <div className="absolute top-2 right-2 md:top-3 md:right-3 flex items-center gap-1.5 z-10">
          {isEnrolled && (
            <div className="bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-extrabold shadow-xs flex items-center gap-1">
              ✓ Enrolled
            </div>
          )}
          {onToggleWishlist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(course._id);
              }}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-xs"
              title="Add to Wishlist"
            >
              {isWishlisted ? <FaHeart className="text-red-500 text-xs md:text-sm" /> : <FaRegHeart className="text-xs md:text-sm" />}
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center md:justify-start py-1 pr-2 md:pr-0 md:px-1">
        <h3 className="text-[15px] md:text-lg font-black text-slate-900 leading-snug line-clamp-2 md:mb-1.5 group-hover:text-blue-600 transition-colors">{titleTe}</h3>
        <p className="text-[11px] md:text-xs font-semibold text-slate-500 mt-1 md:mb-4">{course.level || 'Beginner to Advanced (Job Ready)'}</p>
        <div className="mt-auto pt-2 md:pt-0 flex items-center justify-start text-[11px] md:text-xs text-slate-600 font-bold mb-1 md:mb-4">
          <div className="text-blue-600 font-medium flex items-center gap-1">
            <FaClock className="text-blue-600" /> {course.duration || '3-4 Months'}
          </div>
        </div>
        <div className="hidden md:flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-400 block">Fee starts from</span>
            <span className="text-base md:text-lg font-black text-slate-900 tracking-tight">₹{course.price || '18,999'}</span>
          </div>
          <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1 rounded-xl shadow-xs">
            View Syllabus
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
