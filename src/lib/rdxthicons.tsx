//src\lib\rdxthicons.tsx

import React from "react";

export class IconsStyle {

    public static readonly DEF_WIDTH = "20px";
    public static readonly DEF_HEIGHT = "20px";
    public static readonly DEF_SIZE = "2";
    public static readonly DEF_INBAR_SIZE = "2";
    public static readonly DEF_COLOR: any = "#EEEEEE";

    public static readonly DEF_WIDTHN:number = 20;
    public static readonly DEF_HEIGHTN:number = 20;

};//end class

import {
    MagnifyingGlassIcon, PersonIcon, LockClosedIcon, ArrowUpIcon,ArrowDownIcon,
    CheckIcon, Cross2Icon, FilePlusIcon, Pencil2Icon,Link2Icon,EyeOpenIcon,
    Share2Icon, TrashIcon, ArrowRightIcon, ArrowLeftIcon,ClipboardCopyIcon,
    HomeIcon,PlayIcon,CopyIcon,GearIcon,AvatarIcon,RocketIcon,CodeSandboxLogoIcon,
    DownloadIcon,ShuffleIcon,PaperPlaneIcon,ArchiveIcon,SquareIcon,PauseIcon,
    ResetIcon,ChevronLeftIcon,ChevronRightIcon,SpeakerLoudIcon,DoubleArrowLeftIcon,
    SpeakerOffIcon,GlobeIcon,UploadIcon,InfoCircledIcon

} from "@radix-ui/react-icons";


// icon library
//.........................................................................................
export enum LIB_ICON {
    HOME        = "HomeIcon",
    USER        = "AvatarIcon",
    SEARCH      = "MagnifyingGlassIcon" ,
    OPEN        = "EyeOpenIcon",
    EDIT        = "Pencil2Icon",
    CANCEL      = "Cross2Icon",
    MOVE_UP     = "ArrowUpIcon",
    MOVE_DOWN   = "ArrowDownIcon",  
    DELETE      = "TrashIcon",  
    ADD         = "FilePlusIcon",
    ARROW_LEFT  = "ArrowLeftIcon", 
    ARROW_RIGHT = "ArrowRightIcon",  
    EXPORT      = "Share2Icon", 
    DOWNLOAD    = "DownloadIcon",
    CLIPBOARD   = "ClipboardCopyIcon",
    OK          = "CheckIcon",
    RUN         = "PaperPlaneIcon",
    EXECUTE     = "RocketIcon",
    COPY        = "CopyIcon",
    SETTINGS    = "GearIcon",
    CODE        = "CodeSandboxLogoIcon",
    SERVERFILE  = "ArchiveIcon",
    PLAY        = "PlayIcon",
    STOP        = "SquareIcon",
    PAUSE       = "PauseIcon",
    MOVE_START  = "ResetIcon",
    PREVIOUS    = "ChevronLeftIcon",
    NEXT        = "ChevronRightIcon",
    VOLUMEON    = "SpeakerLoudIcon",
    VOLUMEOFF   = "SpeakerOffIcon",
    VIEW        = "EyeOpenIcon",
    APICALL     = "GlobeIcon",
    IMPORT      = "UploadIcon",
    WAIT        = "InfoCircledIcon",
    ALEATORY    = "ShuffleIcon",
    INSERT      = "insert",
    UPDATE      = "update",    
    CLOSE       = "close",
    SAVE        = "save",
    DELETE_ALL  = "delete_all",    
    EXIT        = "exit",
    NAV_BACK    = "navigation_back",
    NAV_HOME    = "navigation_home",
    MOVE_FIRST  = "move_first",
    MOVE_LAST   = "move_last",
    CLEAR       = "clear",    
};


// icon component
//.........................................................................................
interface CompProps {
    name: string;
    color?: string;
    width?: number;
    height?: number;
};

export function XIcon ({name,width,height,color}: CompProps) {

    const i_c: string = color ?? IconsStyle.DEF_COLOR;
    const i_w: number = width ?? IconsStyle.DEF_WIDTHN;
    const i_h: number = height ?? IconsStyle.DEF_HEIGHTN;

    const renderIcon = () => {
        
        if(name==LIB_ICON.SEARCH)          {return <MagnifyingGlassIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.HOME)       {return <HomeIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.ADD)        {return <FilePlusIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.OK)         {return <CheckIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.EDIT)       {return <Pencil2Icon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.CANCEL)     {return <Cross2Icon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.OPEN)       {return <EyeOpenIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.DELETE)     {return <TrashIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.MOVE_UP)    {return <ArrowUpIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.MOVE_DOWN)  {return <ArrowDownIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.ARROW_LEFT) {return <ArrowLeftIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.ARROW_RIGHT){return <ArrowRightIcon color={i_c} width={i_w} height={i_h}/>;}        
        else if(name==LIB_ICON.IMPORT)     {return <UploadIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.EXPORT)     {return <Share2Icon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.CLIPBOARD)  {return <ClipboardCopyIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.RUN)        {return <PaperPlaneIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.COPY)       {return <CopyIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.USER)       {return <AvatarIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.SETTINGS)   {return <GearIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.EXECUTE)    {return <RocketIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.CODE)       {return <CodeSandboxLogoIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.DOWNLOAD)   {return <DownloadIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.SERVERFILE) {return <ArchiveIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.PLAY)       {return <PlayIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.STOP)       {return <SquareIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.PAUSE)      {return <PauseIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.MOVE_START) {return <DoubleArrowLeftIcon color={i_c} width={i_w} height={i_h}/>;}        
        else if(name==LIB_ICON.PREVIOUS)   {return <ChevronLeftIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.NEXT)       {return <ChevronRightIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.VOLUMEON)   {return <SpeakerLoudIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.VOLUMEOFF)  {return <SpeakerOffIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.ALEATORY)  {return <ShuffleIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.VIEW)  {return <EyeOpenIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.APICALL)  {return <GlobeIcon color={i_c} width={i_w} height={i_h}/>;}
        else if(name==LIB_ICON.WAIT)  {return <InfoCircledIcon color={i_c} width={i_w} height={i_h}/>;}

        console.log("return icon null");
        return (null);
    };

    return (<div>{renderIcon()}</div>)

}//end component