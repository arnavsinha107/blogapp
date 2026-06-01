import GlareHover from './ui/GlareHover'

function LoginButton() {
  return (
    <div className="w-full relative h-[48px]">
      <GlareHover
        width="100%"
        height="100%"
        background="#4f46e5"
        borderRadius="8px"
        borderColor="transparent"
        glareColor="#ffffff"
        glareOpacity={0.25}
        glareAngle={-30}
        glareSize={200}
        className="h-full w-full active:scale-[0.98] transition-all shadow-md hover:shadow-lg hover:scale-[1.01]"
      >
        <span className="text-white font-bold text-xs uppercase tracking-widest pointer-events-none">
          Sign In
        </span>
        <button type="submit" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10" />
      </GlareHover>
    </div>
  )
}

export default LoginButton
